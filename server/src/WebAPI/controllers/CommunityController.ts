import { Router, Request, Response } from "express";
import { ICommunityService } from "../../Domain/services/community/ICommunityService";
import multer from "multer";
import { CommunityDto } from "../../Domain/DTOs/CommunityDto";
import { TopicDto } from "../../Domain/DTOs/TopicDto";

export class CommunityController {

    private router: Router;
    private communityService: ICommunityService;

    public constructor(communityService: ICommunityService){
        this.router = Router();
        this.communityService = communityService;
        this.InitializeRoutes();
    }

    private InitializeRoutes(){
        const upload = multer({dest: "uploads/icons/"});
        this.router.post("/community/create", upload.single("iconFile") ,this.create.bind(this));
    }

    private async create(req: Request, res: Response): Promise<void> {
    try {
        const topics: TopicDto[] = req.body.topics ? JSON.parse(req.body.topics) : [];

        const dto = new CommunityDto(
            0,                            
            topics,                       
            req.body.name,                
            req.body.description,         
            "",                           
            1,                            
            req.body.status,              
            req.body.isMature === 'true', 
            new Date(),                   
            req.file ?? undefined         
        );

        const createdCommunity = await this.communityService.create(dto);

        if (createdCommunity.communityId > 0) {
            res.status(201).json({
                success: true,
                message: "Community created successfully",
                data: createdCommunity
            });
            return;
        }

        res.status(401).json({ success: false, message: "That community already exists" });

    } catch (error) {
        console.error("Error creating community:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


    public getRouter(): Router{
        return this.router;
    }
}