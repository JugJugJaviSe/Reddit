import { UserDto } from "../../DTOs/UserDto";

export interface IUserService {
    create(username: string, password: string, fullName: string): Promise<UserDto>;
}