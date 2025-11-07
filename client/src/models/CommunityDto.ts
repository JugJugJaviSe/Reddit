import type { TopicDto } from "./TopicDto";

export interface CommunityDto{
    topics: TopicDto[];
    communityType: string;
    isMature: boolean;
    name: string;
    description: string;
    icon: File | null;
    communityId?: number;
}