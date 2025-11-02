import { RiHome5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuthHook";

export function SideMenu(){

    const {user} = useAuth();
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate(`/${user?.role}-dashboard`);
    }

    return(
        <div className="w-40 bg-[#181c1f] absolute left-1 top-13 flex flex-col p-2 rounded shadow-lg text-white">
            <button className="cursor-pinter hover:bg-gray-700 rounded px-2 py-1 mb-1 flex items-center cursor-pointer" onClick={navigateHome}><RiHome5Line className="mr-2"/> Home</button>

        </div>
    );
}