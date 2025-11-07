import type { CommunityDto } from "../../models/CommunityDto";

export type CommunityAPIResponse = {
    success: boolean;
    message: string;
    data? : CommunityDto;
}