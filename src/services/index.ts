import { MODEL_BASE_URL, post } from "./utils";

// Hice opcional el token porque no lo tenía para pasarselo pero hay que hacerlo obligatorio
export const predict = async (data: any, token?: string) => {
    console.log("Predicting for data...", data);
    return await post(`${MODEL_BASE_URL}:predict`, data, token);
};