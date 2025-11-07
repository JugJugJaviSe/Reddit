import { TopicDto } from "./TopicDto";

export class CommunityDto{
    public constructor(
        public communityId: number = 0,
        public topics: TopicDto[] = [],
        public name: string = "",
        public description: string = "",
        public icon: string = "",
        public memberCount: number = 0,
        public status: string = "",
        public isMature: boolean = false,
        public createdAt: Date = new Date(),
        public iconFile?: Express.Multer.File,
    ){}
}