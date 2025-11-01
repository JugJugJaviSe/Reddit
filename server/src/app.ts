import express from 'express';
import cors from 'cors';
import { IUserRepository } from './Domain/repositories/IUserRepository';
import { UserRepository } from './Database/repositories/UserRepository';
import { IAuthService } from './Domain/services/auth/IAuthService';
import { AuthService } from './Services/auth/AuthService';
import { IUserService } from './Domain/services/users/IUserService';
import { UserService } from './Services/users/UserService';
import { AuthController } from './WebAPI/controllers/AuthController';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const userRepo: IUserRepository = new UserRepository();

const authService: IAuthService = new AuthService(userRepo);
const userService: IUserService = new UserService(userRepo);

const authController: AuthController = new AuthController(authService);

app.use('/api/v1', authController.getRouter());

export default app;
