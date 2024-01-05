import { createRequestInstance } from "./lib/request";

// 获取申请列表
export interface GroupInviteListItem {
    id: string;
    gid: string;
    uid: string;
    admin_uid: string;
    admin_status: number; // 1:未处理 2:已同意 3:已拒绝
    member_status: number; // 1:未处理 3:已同意 3:已拒绝
    enc_key: string;
    create_time: number;
}

export interface GroupInviteListParams {
    gids: string[];
}

const getList = (params: GroupInviteListParams) => {
    return createRequestInstance(true).post('/group-invite/list', params);
};

// 添加邀请(仅管理员、群主可用)
export interface GroupInviteAddParams {
    gid: string;
    uid: string;
    enc_key: string;
}
const add = (params: GroupInviteAddParams) => {
    return createRequestInstance(true).post('/group-invite/add', params);
};


// 同意加入群组
export interface GroupInviteAgreeParams {
    id: string;
    enc_key: string;
}

const agree = (params: GroupInviteAgreeParams) => {
    return createRequestInstance(true).post('/group-invite/agree', params);
};


// 管理员同意加入群组
export interface GroupInviteAdminAgreeParams {
    id: string;
    enc_key: string;
}

const adminAgree = (params: GroupInviteAdminAgreeParams) => {
    return createRequestInstance(true).post('/group-invite/adminAgree', params);
}


// 拒绝加入群组
export interface GroupInviteRejectParams {
    gid: string;
}

const reject = (params: GroupInviteRejectParams) => {
    return createRequestInstance(true).post('/group-invite/reject', params);
};


// 管理员拒绝加入群组
export interface GroupInviteAdminRejectParams {
    gid: string;
    uid: string;
}


const adminReject = (params: GroupInviteAdminRejectParams) => {
    return createRequestInstance(true).post('/group-invite/adminReject', params);
}


export default {
    getList,
    add,
    agree,
    adminAgree,
    reject,
    adminReject
}
