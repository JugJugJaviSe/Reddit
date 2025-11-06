import { CategoryDto } from "../../Domain/DTOs/CategoryDto";
import { ICategoryRepository } from "../../Domain/repositories/ICategoryRepository";
import { ICategoryService } from "../../Domain/services/categories/ICategoriesService";

export class CategoryService implements ICategoryService{

    public constructor(private categoryRepo: ICategoryRepository){}
    
    async getCategoriesWithTopics(): Promise<CategoryDto[]> {

        const rows = await this.categoryRepo.getCategoriesWithTopics();

        const map = new Map<number, CategoryDto>();

        for(const row of rows){

            if(!map.has(row.categoryId)){
                map.set(row.categoryId, 
                    {
                        categoryId: row.categoryId,
                        name: row.categoryName,
                        topics: []
                    }
                )
            }

            if(row.topicId){
                map.get(row.categoryId)!.topics.push({
                    topicId: row.topicId,
                    name: row.topicName
                });
            }

        }

        return Array.from(map.values());
    }
}