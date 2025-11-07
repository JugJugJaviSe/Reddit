import { CommunityDto } from "../../DTOs/CommunityDto";

export interface ICommunityService{
   create(community: CommunityDto): Promise<CommunityDto>;
}