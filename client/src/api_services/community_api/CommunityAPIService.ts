import type { CommunityDto } from "../../models/CommunityDto";
import type { CommunityAPIResponse } from "../../types/community/CommunityAPIResponse";
import type { ICommunityAPIService } from "./ICommunityAPIService";
import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL + "community";

export const communityApi: ICommunityAPIService = {
    
    async create(communityDto: CommunityDto): Promise<CommunityAPIResponse> {
        
        try{

            const formData = new FormData();

            formData.append("name", communityDto.name);
            formData.append("description", communityDto.description);
            formData.append("status", communityDto.communityType);
            formData.append("isMature", communityDto.isMature.toString());
            formData.append("topics", JSON.stringify(communityDto.topics));

            if(communityDto.icon){
            formData.append("iconFile", communityDto.icon);
            }
            
            const res = await axios.post<CommunityAPIResponse>(`${API_URL}/create`, formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });

            return res.data;
        }catch(error){
            let message = "Error while creating community";
            if(axios.isAxiosError(error)){
                message = error.response?.data.message || message;
            }
            return {success: false, message, data: undefined};
        }
    }
}