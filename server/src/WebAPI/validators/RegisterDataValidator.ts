import { ValidationResult } from "../../Domain/types/ValidationResult";
import { validateLoginData } from "./LoginDataValidator";

export function validateRegisterData(username: string, password: string, fullName: string, role: string) : ValidationResult {
    const validationResult: ValidationResult = validateLoginData(username, password);

    if (!validationResult.success)  // Invalid username or password
        return validationResult;
    
    if (!fullName || !role)
        return { success: false, message: "Fields cannot be left empty" };

    if (fullName.length < 5)
        return { success: false, message: "Full name must have at least 5 characters" };

    if (fullName.length > 30)
        return { success: false, message: "Full name can't have more than 30 characters" };

    if (role !== "user" && role !== "admin")
        return { success: false, message: `Undefined role: ${role}` };

    return { success: true }
}