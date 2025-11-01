import { useState } from "react";
import type { IAuthAPIService } from "../../api_services/auth_api/IAuthAPIService";
import { useAuth } from "../../hooks/UseAuthHook";
import type { ValidationResult } from "../../types/validation/ValidationResult";
import { validateLoginData } from "../../api_services/validators/LoginDataValidator";
import { Link } from "react-router-dom";

interface AuthFormProps{
    authApi: IAuthAPIService;
}

export function LoginForm({authApi}: AuthFormProps){

    const[username, setUsername] = useState<string>("");
    const[password, setPassword] = useState<string>("");
    const[errorMessage, setErrorMessage] = useState<string>("");
    const {login} = useAuth();

    const applyLoginForm = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationResult: ValidationResult = validateLoginData(username, password);
        if(!validationResult.success){
            setErrorMessage(validationResult.message ?? "Invalid data");
            return;
        }

        const authResult = await authApi.login(username, password);
        if(authResult.success && authResult.data){
            login(authResult.data);
        }else{
            setErrorMessage(authResult.message);
            setUsername("");
            setPassword("");
        }
    }

    return(<div>
        <h1>Login</h1>
        <form onSubmit={applyLoginForm}>
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
            min={3}
            max={20}
            required
            onChange={(e) => setPassword(e.target.value)}
            ></input>
            {errorMessage && (<p>{errorMessage}</p>)}

            <button type="submit">Login</button>

            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </form>
    </div>);
}