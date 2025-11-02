import { useEffect } from "react";
import type { IAuthAPIService } from "../../api_services/auth_api/IAuthAPIService";
import { useAuth } from "../../hooks/UseAuthHook";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/auth/LoginForm";
import { MainTab } from "../../components/tab/MainTab";
import bgImage from "../../assets/loginBackground.png"
import { DropdownMenu } from "../../components/tab/DropdownMenu";
import { SideMenu } from "../../components/tab/SideMenu";

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

    return(<main className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{backgroundImage: `url(${bgImage})`}}>
        <MainTab dropdownMenu = {DropdownMenu} sideMenu={SideMenu}></MainTab>
        <LoginForm authApi={authApi}></LoginForm>
    </main>);
}