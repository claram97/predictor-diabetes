import { LOCAL_PREDICT_PATH } from "./paths";
import { MODEL_BASE_URL, post } from "./utils";

export const predict = async (data: any, token?: string) => {
    console.log("Predicting for path: ", `${MODEL_BASE_URL}${LOCAL_PREDICT_PATH}`);
    return await post(`${MODEL_BASE_URL}${LOCAL_PREDICT_PATH}`, data, token);
};