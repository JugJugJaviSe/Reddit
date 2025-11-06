import { Community } from "../models/Community";


export interface ICommunityRepository{
    create(community: Community): Promise<Community>;
}