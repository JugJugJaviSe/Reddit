import { RiHome5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuthHook";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
import CreateCommunityPopup from "./create_community/CreateCommunityPopup";

export function SideMenu(){

    const {user} = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const navigateHome = () => {
        navigate(`/${user?.role}-dashboard`);
    }

    return(
        <div className="w-50 bg-[#181c1f] absolute left-1 top-13 flex flex-col p-2 rounded shadow-lg text-white">
            <button className="cursor-pointer hover:bg-gray-700 rounded px-2 py-1 mb-1 flex items-center cursor-pointer" onClick={navigateHome}><RiHome5Line className="mr-2"/> Home</button>
            <button className="cursor-pointer hover:bg-gray-700 rounded px-2 py-1 mb-1 flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}><GoPlus className="mr-1 -ml-0.5" size={22}/>Start a community</button>
            <CreateCommunityPopup isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    );
}