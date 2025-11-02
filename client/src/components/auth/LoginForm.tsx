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

    return(<div className="h-96 w-70 flex items-center justify-center rounded-lg bg-[#181c1f] text-white p-6">
        <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-bold mb-5 mt-5">Log In</h1>
        <form onSubmit={applyLoginForm} className="flex flex-col items-center gap-4">
            <input
            type="text"
            placeholder="Username"
            value={username}
            min={3}
            max={20}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="mb-5 border border-gray-400 border-2 rounded-md p-2"
            ></input>
            <input
            type="password"
            placeholder="Password"
            value={password}
            min={3}
            max={20}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="mb-5 border border-gray-400 border-2 rounded-md p-2"
            ></input>
            {errorMessage && (<p className="text-red-500">{errorMessage}</p>)}

            <button type="submit" className="bg-[#23272a] hover:bg-[#d93900] font-bold py-2 px-20 rounded">Log In</button>

            <p>Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link></p>
        </form>
        </div>
    </div>);
}