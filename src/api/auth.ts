import { createRequestInstance } from "./lib/request";
import { UserInfo } from "./user";

const register = (): Promise<{
    uid: string,
    avatar: string,
    name: string,
    pub_key: string,
    create_time: number
}> => {
    return createRequestInstance(true).post('/auth/register');
}

const updateName = async (name: string): Promise<null> => {
    return await createRequestInstance(true).post('/user/updateName', { name });
}
const updateGender = async (gender: number): Promise<null> => {
    return await createRequestInstance(true).post('/user/updateGender', { gender })
}
const updateAvatar = async (avatar: string): Promise<null> => {
    return await createRequestInstance(true).post('/user/updateAvatar', { avatar })
}
const updateSign = async (sign: string): Promise<null> => {
    return await createRequestInstance(true).post('/user/updateSign', { sign })
}
// 销毁账号
const destroy = async (): Promise<null> => {
    // 删除账号相关的缓存
    return null
}
const info = async (): Promise<UserInfo> => {
    return await createRequestInstance(true).post('/auth/info');
}
export default {
    register,
    updateName,
    updateGender,
    updateAvatar,
    destroy,
    updateSign,
    info
}