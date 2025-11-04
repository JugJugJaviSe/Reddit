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

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const userRepo: IUserRepository = new UserRepository();
const categoryRepo: ICategoryRepository = new CategoryRepository();

const authService: IAuthService = new AuthService(userRepo);
const userService: IUserService = new UserService(userRepo);
const categoryService: ICategoryService = new CategoryService(categoryRepo);

const authController: AuthController = new AuthController(authService);
const categoryController: CategoryController = new CategoryController(categoryService);

app.use('/api/v1', authController.getRouter());
app.use('/api/v1', categoryController.getRouter());

export default app;
