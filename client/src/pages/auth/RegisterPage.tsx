import { useNavigate } from "react-router-dom";
import type { IAuthAPIService } from "../../api_services/auth_api/IAuthAPIService";
import { useAuth } from "../../hooks/UseAuthHook";
import { useEffect } from "react";
import { RegisterForm } from "../../components/auth/RegisterForm";

interface RegisterPageProps{
    authApi: IAuthAPIService;
}

export default function RegisterPage({authApi}: RegisterPageProps){
    const {isAuthenticated, user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated && user){
            navigate(`/${user.role}-dashboard`);
        };
    },[isAuthenticated, navigate, user]);

    return(
        <main>
            <RegisterForm authApi={authApi} />
        </main>
    );
}
