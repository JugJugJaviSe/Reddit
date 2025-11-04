import { TopicDto } from "./TopicDto";

export class CategoryDto{
    public constructor(
        public categoryId: number,
        public name: string,
        public topics: TopicDto[]
    ){}
}