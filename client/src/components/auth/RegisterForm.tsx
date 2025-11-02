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
        <div className="h-96 w-70 flex items-center justify-center rounded-lg bg-[#181c1f] text-white p-6">
            <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-bold mb-5 mt-5">Register</h1>
            <form onSubmit={applyRegisterForm} className="flex flex-col items-center">
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
                    min={6}
                    max={20}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-5 border border-gray-400 border-2 rounded-md p-2"
                ></input>
                <input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    min={6}
                    max={20}
                    required
                    onChange={(e) => setFullName(e.target.value)}
                    className="mb-3 border border-gray-400 border-2 rounded-md p-2"
                ></input>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <button
                    type="submit" className="bg-[#23272a] hover:bg-[#d93900] font-bold py-2 px-20 rounded mt-2"
                >Register</button>
            </form>

            <p>Already have an account?{" "}<Link to={"/login"} className="text-blue-500 mb-2">Login</Link></p>
            </div>
        </div>
    );
}