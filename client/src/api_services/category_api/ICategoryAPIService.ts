import type { CategoryAPIResponse } from "../../types/category/CategoryAPIResponse";

export interface ICategoryAPIService{
    getCategoriesWithTopics(): Promise<CategoryAPIResponse>;
}