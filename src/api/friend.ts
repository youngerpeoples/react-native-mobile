import { createRequestInstance } from "./lib/request";

const inviteApply = (params: {
  obj_uid: string,
  remark?: string
}): Promise<any> => {
  return createRequestInstance(true).post('/friend/inviteApply', params);
}

const inviteRead = (): Promise<any> => {
  return createRequestInstance(true).post('/friend/inviteRead');
}
export interface InviteListItem {
  id: string;
  obj_uid: string;
  uid: string;
  name: string,
  status: number;
  avatar: string;
  remark: string;
  create_time: number;
}
const getInviteList = (): Promise<{
  items: InviteListItem[]
}> => {
  return createRequestInstance(true).post('/friend/inviteList');
}
const inviteAgree = (id: string) => {
  return createRequestInstance(true).post('/friend/inviteAgree', { id });
}
const inviteReject = (id: string) => {
  return createRequestInstance(true).post('/friend/inviteReject', { id });
}
export interface FriendListItem {
  uid: string;
  gender: number;
  name_index: string;
  chat_id: string;
  remark?: string;
  remark_index?: string;
  avatar: string;
  pub_key: string;
  name: string;
}
const getList = (uids: string[]): Promise<{
  items: FriendListItem[]
}> => {
  return createRequestInstance(true).post('/friend/list',{uids});
}

const del = (uid: string) => {
  return createRequestInstance(true).post('/friend/delete', { uid });
}
export interface RelationListItem {
  uid: string;
  is_friend: number;
  remark?: string;
  name: string;
  sign: string;
  avatar: string;
  gender: number;
}
const relationList = (uids: string[]): Promise<{
  items: RelationListItem[]
}> => {
  return createRequestInstance(true).post('/friend/relationList', { uids });
}
const updateRemark = (uid: string, remark: string): Promise<null> => {
  return createRequestInstance(true).post('/friend/updateRemark', { uid, remark });
}
export default {
  getList,
  inviteAgree,
  inviteApply,
  getInviteList,
  inviteReject,
  del,
  inviteRead,
  relationList,
  updateRemark
}