import type { ValidationResult } from "../../types/validation/ValidationResult";

export function validateCreateCommunityData(name: string, description: string): ValidationResult{
    
    if(!name){
        return{ success: false, message: "Name field cannot be empty"};
    }

    if(name.length < 3){
        return {success: false, message: "Name must have at least 3 characters"}
    }

    if(name.length > 30){
        return {success: false, message: "Name cannot have more than 30 characters"}
    }

    if(description.length > 150){
        return {success: false, message: "Description cannot have more than 150 characters"}
    }

    return {success: true};
}