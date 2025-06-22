import { MODEL_BASE_URL, post } from "../utils";

export const predict = async (data: any, token: string) => {
    return await post(`${MODEL_BASE_URL}:predict`, data, token);
};