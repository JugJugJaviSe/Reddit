import { ResultSetHeader } from "mysql2";
import { Community } from "../../Domain/models/Community";
import { ICommunityRepository } from "../../Domain/repositories/ICommunityRepository";
import db from "../connection/db_connection_pool";

export class CommunityRepository implements ICommunityRepository{
    
    async create(community: Community): Promise<Community> {
        
        try{
            const query = `INSERT INTO community (Name, Description, Icon, MemberCount, status, is_mature, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const [result] = await db.execute<ResultSetHeader>(query, [community.name, community.description, community.iconPath, community.memberCount, community.status, community.isMature, community.createdAt]);

            if(result.insertId){
                return new Community(result.insertId, community.name, community.description, community.iconPath, community.memberCount, community.status, community.isMature, community.createdAt);
            }

            return new Community();

        }catch(error){
            console.error('Error while creating commynity:', error);
            
            return new Community();
        }
    }

}