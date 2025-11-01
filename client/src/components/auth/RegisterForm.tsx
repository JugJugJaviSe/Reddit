import { useState } from "react";
import type { IAuthAPIService } from "../../api_services/auth_api/IAuthAPIService";
import { useAuth } from "../../hooks/UseAuthHook";
import type { ValidationResult } from "../../types/validation/ValidationResult";
import { validateRegisterData } from "../../api_services/validators/RegisterDataValidator";
import { Link } from "react-router-dom";


interface AuthFormProps{
    authApi: IAuthAPIService;
}

export function RegisterForm({authApi}:AuthFormProps){

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { login } = useAuth();

    const applyRegisterForm = async(e: React.FormEvent) =>{
        e.preventDefault();

        const validationResult: ValidationResult = validateRegisterData(username, password, fullName);

        if(!validationResult.success){
            setErrorMessage(validationResult.message ?? "Invalid data");
            return;
        }

        const authResult = await authApi.register(username, password, fullName, 'user');

        if(authResult.success && authResult.data){
            login(authResult.data);
        }else{
            setErrorMessage(authResult.message);
            setUsername("");
            setPassword("");
            setFullName("");
        }
    };

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={applyRegisterForm}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    min={3}
                    max={20}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    min={6}
                    max={20}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    min={6}
                    max={20}
                    required
                    onChange={(e) => setFullName(e.target.value)}
                ></input>

                {errorMessage && <p>{errorMessage}</p>}
                <button
                    type="submit"
                >Register</button>
            </form>

            <p>Already have an account?{" "}<Link to={"/login"}>Login</Link></p>
        </div>
    );
}