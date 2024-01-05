import { createRequestInstance } from "./lib/request";

const getPresignedUrl = async (key: string):Promise<{
    url: string;
}> => {
    return createRequestInstance(true).post('/sys/preSignURL', { key });
};

export default {
    getPresignedUrl,
}