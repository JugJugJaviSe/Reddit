import type { ValidationResult } from "../../types/validation/ValidationResult";
import { validateLoginData } from "./LoginDataValidator";

export function validateRegisterData(username: string, password: string, fullName: string): ValidationResult{

    const validationResult: ValidationResult = validateLoginData(username, password);

    if(!validationResult.success){
        return validationResult;
    }

    if(!fullName){
        return {success: false, message: "Fields cannot be empty"};
    }

    if(fullName.length < 5){
        return {success: false, message: "Full name must be at least 5 characters long"}
    }

    if(fullName.length > 30){
        return {success: false, message: "Full name cannot have more than 30 characters"};
    }

    return {success: true}
}