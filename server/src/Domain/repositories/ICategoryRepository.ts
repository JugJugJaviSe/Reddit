import { CategoryWithTopic } from "../models/CategoryWithTopic";

export interface ICategoryRepository{
    getCategoriesWithTopics(): Promise<CategoryWithTopic[]>;
}