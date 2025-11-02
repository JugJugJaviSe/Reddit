import { DropdownMenu } from "../../components/tab/DropdownMenu";
import { MainTab } from "../../components/tab/MainTab";
import { SideMenu } from "../../components/tab/SideMenu";
import { useAuth } from "../../hooks/UseAuthHook";

export default function UserProfile(){
    
    const {user} = useAuth();

    return(<main className="min-h-screen flex flex-col items-center justify-center">
        <MainTab dropdownMenu={DropdownMenu} sideMenu={SideMenu}></MainTab>
        <p>Hi <strong>{user?.username}</strong>!</p>
    </main>);
}{/* posting, in community or on your profile? */}