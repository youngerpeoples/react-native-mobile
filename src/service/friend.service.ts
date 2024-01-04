import friendApi from "@/api/friend";
const getBatchInfo = async (uids: string[]) => {
    const data = await friendApi.getList(uids);
    return data.items;
}
const getInfo = async (uid: string) => {
    const items = await getBatchInfo([uid]);
    if (items.length > 0) {
        return items[0];
    }
    return null;
}
const getList = async () => {
    const data = await friendApi.getList([]);
    const {items} = data;
    items.forEach((item,i) => {
        item.name = item.remark || item.name;
        item.name_index = item.remark_index || item.name_index;
        items[i] = item;
    });
    items.sort((a, b) => a.name_index.charCodeAt(0) - b.name_index.charCodeAt(0));
    const alphabet = [...new Set(items.map(item => item.name_index))];
    const alphabetIndex:{ [key: string]: number } = {}
    alphabet.forEach((item) => {
        alphabetIndex[item] = items.findIndex((i) => i.name_index === item);
    })
    return {
        items,
        alphabet,
        alphabetIndex
    };
}
const removeAll = async () => {
    return true;
}
const removeBatch = async (uids: string[]) => {
    return true;
}
const remove = async (uid: string) => {
    return removeBatch([uid]);
}
const updateRemark = (uid: string, remark: string):Promise<null> => {
    return friendApi.updateRemark(uid, remark);
}
export default {
    getList,
    getBatchInfo,
    getInfo,
    removeAll,
    removeBatch,
    remove,
    updateRemark
};