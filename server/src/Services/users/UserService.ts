import { UserDto } from "../../Domain/DTOs/UserDto";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import { IUserService } from "../../Domain/services/users/IUserService";

export class UserService implements IUserService {

    public constructor(private userRepo: IUserRepository){}

    async create(username: string, password: string, fullName: string): Promise<UserDto> {
        
        const newUser = await this.userRepo.create(new User(0, username, password, fullName, 'user', new Date()));

        if(newUser.id !== 0){
            return new UserDto(newUser.id, newUser.username, newUser.fullName);
        }
        return new UserDto();
    }

}