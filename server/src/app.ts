import express from 'express';
import cors from 'cors';
import { IUserRepository } from './Domain/repositories/IUserRepository';
import { UserRepository } from './Database/repositories/UserRepository';
import { IAuthService } from './Domain/services/auth/IAuthService';
import { AuthService } from './Services/auth/AuthService';
import { IUserService } from './Domain/services/users/IUserService';
import { UserService } from './Services/users/UserService';
import { AuthController } from './WebAPI/controllers/AuthController';
import { ICategoryRepository } from './Domain/repositories/ICategoryRepository';
import { CategoryRepository } from './Database/repositories/CategoryRepository';
import { ICategoryService } from './Domain/services/categories/ICategoriesService';
import { CategoryService } from './Services/categories/CategoryService';
import { CategoryController } from './WebAPI/controllers/CategoryController';
import { ICommunityRepository } from './Domain/repositories/ICommunityRepository';
import { CommunityRepository } from './Database/repositories/CommunityRepository';
import { ICommunityService } from './Domain/services/community/ICommunityService';
import { CommunityService } from './Services/community/CommunityService';
import { CommunityController } from './WebAPI/controllers/CommunityController';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const userRepo: IUserRepository = new UserRepository();
const categoryRepo: ICategoryRepository = new CategoryRepository();
const communityRepo: ICommunityRepository = new CommunityRepository();

const authService: IAuthService = new AuthService(userRepo);
const userService: IUserService = new UserService(userRepo);
const categoryService: ICategoryService = new CategoryService(categoryRepo);
const communityService: ICommunityService = new CommunityService(communityRepo);

const authController: AuthController = new AuthController(authService);
const categoryController: CategoryController = new CategoryController(categoryService);
const communityController: CommunityController = new CommunityController(communityService);

app.use('/api/v1', authController.getRouter());
app.use('/api/v1', categoryController.getRouter());
app.use('/api/v1', communityController.getRouter());

export default app;
