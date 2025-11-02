import { useAuth } from "../../hooks/UseAuthHook";
import redditLogo from "../../assets/redditLogo.png";
import avatar from "../../assets/avatar.png"
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

interface MainTabProps {
  dropdownMenu: React.FC;
  sideMenu: React.FC;
}

export function MainTab({ dropdownMenu: DropdownMenu, sideMenu: SideMenu }: MainTabProps) {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);

  return (
    <div className="fixed top-0 left-0 w-full h-12 bg-[#181c1f] flex items-center px-4 text-white shadow-md z-50">
      
      {isAuthenticated && (
        <>
          <button className="mr-2 cursor-pointer hover:bg-gray-700 rounded-full w-10 h-10 flex justify-center items-center" onClick={toggleSideMenu}>
            <AiOutlineMenu className="w-6 h-6"/>
          </button>
        
          {isSideMenuOpen && <SideMenu />}
        </>
      )}
      
      <img src={redditLogo} alt="Reddit Logo" className="h-full" />
      <p className="ml-2 font-semibold font-bold">reddit</p>

      {isAuthenticated && (
        <div className="ml-auto relative">
          
          <img
            src={avatar}
            alt="avatar"
            className="h-10 rounded-full cursor-pointer"
            onClick={toggleMenu}
          />
          {isMenuOpen && (
              <DropdownMenu />
          )}
        </div>
      )}
    </div>
  );
}
