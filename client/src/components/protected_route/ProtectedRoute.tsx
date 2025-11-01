import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuthHook";
import { DeleteValueByKey } from "../../helpers/LocalStorage";

type ProtectedRouteProps = {
    children: React.ReactNode;
    requiredRole: string;
    redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, requiredRole, redirectTo = "/login"}) => {

    const {isAuthenticated, user, isLoading, logout} = useAuth();
    const location = useLocation();

    const handleLogout = () => {
        DeleteValueByKey("authToken");
        logout();
    }

    if(isLoading){
        return(<h1>Loading...</h1>);
    }

    if(!isAuthenticated){
        return <Navigate to ={redirectTo} state = {{from: location}} replace />;
    }

    if(requiredRole && user?.role !== requiredRole){
        return(
            <main>
                <div>
                    <h2>Access denied</h2>
                    <p>Required role: {`"${requiredRole}", your role is ${user?.role}`}</p>
                    <button onClick={handleLogout}>Log out</button>
                </div>
            </main>
        );
    }
    return <>{children}</>
};