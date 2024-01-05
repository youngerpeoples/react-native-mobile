import type { AxiosInstance } from 'axios';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import Crypto from 'react-native-quick-crypto'
import { globalStorage } from '@/lib/storage';
import {API_BASE_URL} from "@env";
import quickAes from '@/lib/quick-aes';
import toast from '@/lib/toast';
import { Platform } from 'react-native';
export const createRequestInstance = (en = true) => {
  const instance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,//API_BASE_URL,
    withCredentials: false,
    timeout: 3000,
  });
  console.log('API_BASE_URL', API_BASE_URL)
  instance.interceptors.request.use(async (config) => {
    if (en) {

      const wallet = globalThis.wallet;
      if (!wallet) {
        throw new Error('请先登录');
      }
      const content = JSON.stringify(config.data ?? {});
      const time = dayjs().utc().unix() + '';
      const contentHash = Crypto.createHash('sha256').update(content + ":" + time).digest('hex');
      const sign = wallet.signMessageSync(contentHash + ":" + time);
      config.headers.set('X-Time', time);
      config.headers.set('X-OS', Platform.OS);
      config.headers.set('X-Sign', sign);
      config.headers.set('X-UID', wallet.address.toLowerCase());
      config.headers.set('X-Pub-Key', wallet.signingKey.compressedPublicKey);
      config.headers.set('X-Data-Hash', contentHash);
      const sysPubKey = globalStorage.getString('sys-pub-key');
      if(!sysPubKey){
        throw new Error('与服务器连接失败');
      }
      const sharedSecret = wallet.signingKey.computeSharedSecret(Buffer.from(sysPubKey, 'hex')).substring(4);
      console.log('address', wallet.address)
      const enData = quickAes.En(content, sharedSecret);
      config.data = {
        data: enData
      }
    }
    return config
  }, (err) => {
    throw new Error(err.message);
  })
  instance.interceptors.response.use(async (rep): Promise<any> => {

    if (en) {
      const wallet = globalThis.wallet;
      if (!wallet) {
        throw new Error('请先登录');
      }
      const sysPubKey = globalStorage.getString('sys-pub-key');
      if(!sysPubKey){
        throw new Error('与服务器连接失败');
      }
      const sharedSecret = wallet.signingKey.computeSharedSecret(Buffer.from(sysPubKey, 'hex')).substring(4);
      let data = rep.data.data ?? ""
      if (data.substring(0, 2) == '0x') {
        data = data.substring(2)
      }
      let rel: any = {}
      if (data != ""){
        rel = JSON.parse(quickAes.De(data, sharedSecret) ?? {});
      }
      if (rel?.err_code && Number(rel?.err_code) != 0) {
        toast(rel.err_msg);
        throw new Error(rel.err_msg);
      }
      return rel;
    }
    return rep.data.data;
  }, (err) => {
    if (axios.isAxiosError(err)) {
      if (!err.response) {
        toast('网络错误,请稍后重试!');
      } else {
        toast(err.response.data.message ?? '');
      }
    }
    throw new Error(err.message);
  });
  return instance;
};