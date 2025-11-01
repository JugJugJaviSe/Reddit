import { UserDto } from "../../Domain/DTOs/UserDto";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import bcrypt from "bcryptjs";

export class AuthService implements IAuthService {

    private readonly saltRounds: number = parseInt(process.env.SALT_ROUNDS || '10', 10);

    public constructor (private userRepo: IUserRepository){}

    async login(username: string, password: string): Promise<UserDto> {
        const user: User = await this.userRepo.getByUsername(username);

        if(user.id != 0 && await bcrypt.compare(password, user.password)){
            return new UserDto(user.id, user.username, user.role);
        }

        return new UserDto();
    }

    async register(username: string, password: string, fullname: string, role: string): Promise<UserDto> {
        
        const existingUser = await this.userRepo.getByUsername(username);

        if(existingUser.id !== 0){
            return new UserDto();
        }

        const hashedPassword: string = await bcrypt.hash(password, this.saltRounds);

        const newUser = await this.userRepo.create(
            new User(0, username, hashedPassword, fullname, role)
        );

        if(newUser.id !== 0){
            return new UserDto(newUser.id, newUser.username, newUser.role);
        }
        return new UserDto();
    }

}