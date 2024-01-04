import { createRequestInstance } from "./lib/request";

export interface UserInfo {
    id: string;
    name: string;
    gender: number;
    avatar: string;
    name_index:string;
    pub_key: string;
    sign: string;
}
const isRegister = (): Promise<{
    is_register: boolean
}> => {
    return createRequestInstance(true).post('/user/isRegister');
}
const getBatchInfo = (uids: string[]): Promise<{
    items: UserInfo[]
}> => {
    return createRequestInstance(true).post('/user/getBatchInfo', { uids });
}
export default {
    getBatchInfo,
    isRegister,
}