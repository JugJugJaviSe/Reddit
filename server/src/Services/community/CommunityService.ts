import { CommunityDto } from "../../Domain/DTOs/CommunityDto";
import { Community } from "../../Domain/models/Community";
import { ICommunityRepository } from "../../Domain/repositories/ICommunityRepository";
import { ICommunityService } from "../../Domain/services/community/ICommunityService";
import { cloudStorage } from "../cloud/CloudinaryService";

export class CommunityService implements ICommunityService{

    public constructor(private communityRepo: ICommunityRepository){}

    async create(communityDto: CommunityDto): Promise<CommunityDto> {

        let iconUrl = communityDto.icon;

        if(communityDto.iconFile){
            iconUrl = await cloudStorage.uploadImage(communityDto.iconFile);
        }

        const newCommunity = await this.communityRepo.create(new Community(0, communityDto.name, communityDto.description, iconUrl, communityDto.memberCount, communityDto.status, communityDto.isMature, communityDto.createdAt, communityDto.topics));

        if(newCommunity.id > 0){
            return new CommunityDto(newCommunity.id, newCommunity.topics, newCommunity.name, newCommunity.description, newCommunity.iconPath, newCommunity.memberCount, newCommunity.status, newCommunity.isMature, newCommunity.createdAt);
        }

        return new CommunityDto();
    }

}