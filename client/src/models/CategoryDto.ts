import type { TopicDto } from "./TopicDto";

export interface CategoryDto{
    categoryId: number,
    name: string,
    topics: TopicDto[]
}