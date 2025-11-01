import { useEffect } from "react";
import type { IAuthAPIService } from "../../api_services/auth_api/IAuthAPIService";
import { useAuth } from "../../hooks/UseAuthHook";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/auth/LoginForm";

interface LoginPageProps {
    authApi: IAuthAPIService;
}

export default function LoginPage({authApi}: LoginPageProps){

    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated && user){
            navigate(`/${user.role}-dashboard`);
        }
    },[isAuthenticated, user, navigate],);

    return(<main>
        <LoginForm authApi={authApi}></LoginForm>
    </main>);
}