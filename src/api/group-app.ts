import { createRequestInstance } from "./lib/request";

export interface CreateGroupAppParams {
    gid: string;
    name: string;
    icon: string;
    desc: string;
    url: string;
    sort: number;
}
const create = (params: CreateGroupAppParams) => {
    return createRequestInstance(true).post('/group-app/create', params);
};
export interface GroupAppListItem {
    id: string;
    name: string;
    icon: string;
    desc: string;
    url: string;
    sort: number;
}
const getList = () => {
    return createRequestInstance(true).post('/group-app/list');
};
export interface DeleteGroupAppParams {
    id: string;
}
const del = (params: DeleteGroupAppParams) => {
    return createRequestInstance(true).post('/group-app/delete', params);
};
export default {
    create,
    getList,
    del
}
