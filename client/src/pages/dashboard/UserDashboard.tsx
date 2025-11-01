import { useAuth } from "../../hooks/UseAuthHook";

export default function UserDashboard(){

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return(
    <main>
        <h1>Welcome to user dashboard!</h1>
        <button onClick={handleLogout}>Log out</button>
    </main>);
}