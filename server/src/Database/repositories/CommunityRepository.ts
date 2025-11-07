import { ResultSetHeader } from "mysql2";
import { Community } from "../../Domain/models/Community";
import { ICommunityRepository } from "../../Domain/repositories/ICommunityRepository";
import db from "../connection/db_connection_pool";

export class CommunityRepository implements ICommunityRepository {

    async create(community: Community): Promise<Community> {

        try {

            const query = `INSERT INTO community 
                (Name, Description, Icon, MemberCount, status, is_mature, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const [result] = await db.execute<ResultSetHeader>(query, [
                community.name,
                community.description,
                community.iconPath,
                community.memberCount,
                community.status,
                community.isMature,
                community.createdAt
            ]);

            const insertId = result.insertId;

            if (insertId && community.topics && community.topics.length > 0) {
                const queryTopic = `INSERT INTO community_topics (community_id, topic_id) VALUES (?, ?)`;

                for (const topic of community.topics) {
                    await db.execute<ResultSetHeader>(queryTopic, [insertId, topic.topicId]);
                }
            }

            if (insertId) {
                return new Community(
                    insertId,
                    community.name,
                    community.description,
                    community.iconPath,
                    community.memberCount,
                    community.status,
                    community.isMature,
                    community.createdAt,
                    community.topics
                );
            }

            return new Community();

        } catch (error) {
            console.error('Error while creating community:', error);
            return new Community();
        }
    }

}
