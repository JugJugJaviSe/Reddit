import { ValidationResult } from "../../Domain/types/ValidationResult";

export function validateLoginData(username: string, password: string): ValidationResult{
    if (!username || !password)
        return { success: false, message: "Fields cannot be left empty" };
    
    if (username.length < 3)
        return { success: false, message: "Username must have at least 3 characters" };

    if (username.length > 20)
        return { success: false, message: "Username can't have more than 20 characters" };

    if (password.length < 6)
        return { success: false, message: "Password must have at least 6 characters" };

    if (password.length > 20)
        return { success: false, message: "Password can't have more than 20 characters" };

    return { success: true }
}