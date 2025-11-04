import { RowDataPacket } from "mysql2";
import { CategoryWithTopic } from "../../Domain/models/CategoryWithTopic";
import { ICategoryRepository } from "../../Domain/repositories/ICategoryRepository";
import db from "../connection/db_connection_pool";

export class CategoryRepository implements ICategoryRepository{

    async getCategoriesWithTopics(): Promise<CategoryWithTopic[]> {
    try {
        const query = `
            SELECT 
                c.CategoryId AS categoryId,
                c.Name AS categoryName,
                t.TopicId AS topicId,
                t.Name AS topicName
            FROM TopicCategory c
            LEFT JOIN Topics t ON t.CategoryId = c.CategoryId
            ORDER BY c.CategoryId, t.TopicId;
        `;

        const [rows] = await db.execute<RowDataPacket[]>(query);

        return rows.map(row => new CategoryWithTopic(
            row.categoryId,
            row.categoryName,
            row.topicId,
            row.topicName
        ));

    } catch (error) {
        console.error("Error fetching categories with topics:", error);
        throw error;
    }
    }
}