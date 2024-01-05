import { UserInfo } from "@/api/user";
import dayjs from "dayjs";
export interface IMessageImage {
    w: number;
    h: number;
    thumbnail: string;
    original: string;
    t_md5: string;
    t_enc_md5: string;
    o_md5: string;
    o_enc_md5: string;
}
export interface IMessageAudio {
    duration: number;
    url: string;
    md5: string;
    enc_md5: string;
}
export interface IMessageVideo {
    w: number;
    h: number;
    thumbnail: string;
    original: string;
    t_md5: string;
    t_enc_md5: string;
    o_md5: string;
    o_enc_md5: string;
    duration: number;
}
export interface IMessageFile {
    mime: string;
    name: string;
    size: number;
    path: string;
    enc_md5: string;
    md5: string;
}
export type IMessageType = 'text' | 'image' | 'video' | 'audio' | 'file';
export interface IMessageTypeMap {
    text: string;
    image: IMessageImage;
    video: IMessageVideo;
    audio: IMessageAudio;
    file: IMessageFile;
}
type DataType = keyof IMessageTypeMap;
export interface IMessage<T extends DataType> {
    mid: string;
    type: T;
    sequence?: number;
    user?: UserInfo;
    time: dayjs.Dayjs;
    state: number; // 0: 发送中 1: 发送成功 2: 发送失败
    data: IMessageTypeMap[T];
}