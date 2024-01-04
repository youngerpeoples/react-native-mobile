import { createRequestInstance } from "./lib/request"

const send = (params: {
  mid: string;
  chat_id: string;
  content: string;
}): Promise<{
  sequence: number;
  id: string;
  from_uid: string;
  content: string;
}> => {
  return createRequestInstance(true).post('/message/send', params)
}
const getList = (params: {
  limit: number;
  chat_id: string;
  sequence: number;
  direction: 'up' | 'down';
}): Promise<{
  items: {
    sequence: number;
    id: string;
    from_uid: string;
    content: string;
    create_time: number;
  }[];
}> => {
  return createRequestInstance(true).post('/message/list', params)
}
export default {
  send,
  getList
}