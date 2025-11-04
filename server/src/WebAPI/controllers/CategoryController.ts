import { Router, Request, Response } from "express";
import { ICategoryService } from "../../Domain/services/categories/ICategoriesService";


export class CategoryController{

    private router: Router;
    private categoryService: ICategoryService;

    public constructor(categoryService: ICategoryService){
        this.router = Router();
        this.categoryService = categoryService;
        this.InitializeRoutes();
    }

    private InitializeRoutes(){
        this.router.get("/category/categories", this.getCategoriesWithTopics.bind(this));
    }

    private async getCategoriesWithTopics(req: Request, res: Response): Promise<void>{
        try{
            const categories = await this.categoryService.getCategoriesWithTopics();
            
            res.status(200).json({ success: true, message: "Categories successuflly fetched", data:categories});

        }catch(error){
            console.error("Error fetching categories:", error);
            res.status(500).json({success: false, message: "Internal server error"});
        }
    }

    public getRouter(): Router{
        return this.router;
    }
}