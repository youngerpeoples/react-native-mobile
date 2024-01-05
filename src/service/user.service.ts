import userApi, { UserInfo } from '../api/user'
const getBatchInfo = async (ids: string[]): Promise<UserInfo[]> => {
    const data = await userApi.getBatchInfo(ids);
    return data.items;
}
const getInfo = async (id: string): Promise<UserInfo | null> => {
    const users = await getBatchInfo([id]);
    if (users.length > 0) {
        return users[0];
    }
    return null;
}
export default {
    getBatchInfo,
    getInfo
}