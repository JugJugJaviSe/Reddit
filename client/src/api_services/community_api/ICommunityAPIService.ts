import type { CommunityDto } from "../../models/CommunityDto";
import type { CommunityAPIResponse } from "../../types/community/CommunityAPIResponse";

export interface ICommunityAPIService{
    create(communityDto: CommunityDto): Promise<CommunityAPIResponse>;
}