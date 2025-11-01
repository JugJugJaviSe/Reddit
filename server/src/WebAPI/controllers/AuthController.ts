import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import { ValidationResult } from "../../Domain/types/ValidationResult";
import { validateLoginData } from "../validators/LoginDataValidator";
import { UserDto } from "../../Domain/DTOs/UserDto";
import { validateRegisterData } from "../validators/RegisterDataValidator";

export class AuthController {

    private router: Router;
    private authService: IAuthService;

    public constructor(authService: IAuthService){
        this.router = Router();
        this.authService = authService;
        this.InitializeRoutes();
    }

    private InitializeRoutes(){
        this.router.post("/auth/login", this.login.bind(this));
        this.router.post("/auth/register", this.register.bind(this));
    }

    private async login(req: Request, res: Response): Promise<void>{
        try{
            const { username, password } = req.body;

            const validationResult: ValidationResult = validateLoginData(username, password);

            if(!validationResult.success){
                res.status(400).json({success: false, message: validationResult.message});
                return;
            }

            const userAuthResult: UserDto = await this.authService.login(username, password);

            if(userAuthResult.id !== 0){
                const token = jwt.sign(
                    {
                        id: userAuthResult.id,
                        username: userAuthResult.username,
                        role: userAuthResult.role
                    }, process.env.JWT_SECRET || "", {expiresIn: "6h"});
            

                res.status(200).json({success: true, message: "Successful login", data: token })
                return;
            }

            res.status(401).json({ success: false, message: "Wrong username or password"});
        }catch(error){
            console.error(error);
            res.status(500).json({success: false, message: error});
        }
    }
    
    private async register(req: Request, res: Response): Promise<void>{

        try{
            const { username, password, fullName, role } = req.body;

            const validationResult: ValidationResult = validateRegisterData(username, password, fullName, role);

            if(!validationResult.success){
                res.status(400).json({ success: false, message: validationResult.message });
                return;
            }

            const userAuthResult: UserDto = await this.authService.register(username, password, fullName, role);

            if(userAuthResult.id !== 0){
                const token = jwt.sign(
                    {
                        id: userAuthResult.id,
                        username: userAuthResult.username,
                        role: userAuthResult.role
                    }, process.env.JWT_SECRET || "", { expiresIn: "6h" });
                
                res.status(201).json({ success: true, message: "Successful registration", data: token });
                return;
            }
            
            res.status(401).json({ success: false, message: "That username already exists" });
        }catch(error){
            console.error(error);
            res.status(500).json({success: false, message: error});
        }
    }

    public getRouter(): Router{
        return this.router;
    }
}