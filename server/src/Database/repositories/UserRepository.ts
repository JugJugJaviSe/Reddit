import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import db from "../connection/db_connection_pool";
import { User } from "../../Domain/models/User";

export class UserRepository implements IUserRepository {

    async create(user: User): Promise<User>{
        try{
            const query = `INSERT INTO users (Username, Password, FullName, Role) VALUES (?, ?, ?, ?)`;
            const [result] = await db.execute<ResultSetHeader>(query, [user.username, user.password, user.fullName, user.role]);

            if(result.insertId){
                return new User(result.insertId, user.username, user.password, user.fullName, user.role);
            }

            return new User();
        }catch(error){
            console.error('Error while creating user:', error);
            return new User();
        }
    }

    async getById(id: number): Promise<User> {
        try{
            const query = `SELECT * FROM users where Id = ?`;
            const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

            if(rows.length >  0){
                const row = rows[0];
                return new User(row.Id, row.Username, row.Password, row.FullName, row.Role, row.CreatedAt);
            }

            return new User();
        }catch(error){
            console.error('Error while getting user by id:' + error);
            return new User();
        }
    }

    async getByUsername(username: string): Promise<User> {
        try{
            const query = `SELECT * FROM users WHERE Username = ?`;
            const [rows] = await db.execute<RowDataPacket[]>(query, [username]);
            
            if(rows.length > 0){
                const row = rows[0];
                return new User(row.Id, row.Username, row.Password, row.FullName, row.Role, row.CreatedAt);
            }

            return new User();
        }catch(error){
            console.error('Error while getting user by Username:' + error);
            return new User();
        }
    }

    async update(user: User): Promise<User> {
        try{
            const query = `UPDATE users SET Username = ?, FullName = ? WHERE Id = ?`;
            const [result] = await db.execute<ResultSetHeader>(query, [user.username, user.fullName, user.id]);

            if(result.affectedRows > 0){
                return user;
            }
            return new User();
        }catch(error){
            console.error('Error while updating user:', error);
            return new User();
        }
    }

    async delete(id: number): Promise<boolean> {
        try{
            const query = `DELETE FROM users WHERE Id = ?`;
            const [result] = await db.execute<ResultSetHeader>(query, id);

            return result.affectedRows > 0;
        }catch(error)
        {
            console.error('Error while deleting user by id', error);
            return false;
        }
    }

}