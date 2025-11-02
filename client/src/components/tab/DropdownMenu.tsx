import { useAuth } from "../../hooks/UseAuthHook";
import { BiDoorOpen } from "react-icons/bi";
import { PiRedditLogoBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export function DropdownMenu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-40 bg-[#181c1f] absolute right-0 top-12 flex flex-col p-2 rounded shadow-lg text-white">
      <button className="cursor-pointer hover:bg-gray-700 rounded px-2 py-1 mb-1 flex items-center" onClick={() => navigate(`/user-profile`)}>
        <PiRedditLogoBold className="mr-2" /> View Profile
      </button>
      <button
        className="cursor-pointer hover:bg-gray-700 rounded px-2 py-1 flex items-center"
        onClick={handleLogout}
      >
        <BiDoorOpen className="mr-2 text-white" /> Log Out
      </button>
    </div>
  );
}
