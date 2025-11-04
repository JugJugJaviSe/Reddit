import { CategoryDto } from "../../DTOs/CategoryDto";

export interface ICategoryService{
    getCategoriesWithTopics(): Promise<CategoryDto[]>;
}