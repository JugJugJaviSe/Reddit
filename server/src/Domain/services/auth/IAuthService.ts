import { UserDto } from "../../DTOs/UserDto";

export interface IAuthService {
    login(username: string, password: string): Promise<UserDto>;
    register(username: string, password: string, fullname: string, role: string): Promise<UserDto>;
}