import type { CategoryAPIResponse } from "../../types/category/CategoryAPIResponse";
import type { ICategoryAPIService } from "./ICategoryAPIService";
import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL + "category";

export const categoryApi: ICategoryAPIService = {

    async getCategoriesWithTopics(): Promise<CategoryAPIResponse> {
        
        try{
            const res = await axios.get<CategoryAPIResponse>(
                `${API_URL}/categories`
            );
            return res.data;
        }catch(error){
            let message = "Error while returning categories";
            if(axios.isAxiosError(error)){
                message = error.response?.data.message || message;
            }
            return {success: false, message, data: undefined};
        }
    }
}