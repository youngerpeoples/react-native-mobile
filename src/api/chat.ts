import { createRequestInstance } from "./lib/request"

const getList = (): Promise<{
    items: {
        id: string;
        target_id: string;
        name: string;
        type: number;
        avatar: string;
        last_read_sequence: number;
        last_sequence: number;
        last_time: number;
    }[]
}> => {
    return createRequestInstance(true).post('/chat/list')
}
export default {
    getList
}