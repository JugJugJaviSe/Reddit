import { MainTab } from "../../components/tab/MainTab";
import { DropdownMenu } from "../../components/tab/DropdownMenu";
import { SideMenu } from "../../components/tab/SideMenu";

export default function UserDashboard(){

    {/*bg-[#181c1f]*/}
    return(
    <main className="min-h-screen flex flex-col items-center justify-center bg-black">
        <MainTab dropdownMenu={DropdownMenu} sideMenu={SideMenu} ></MainTab>
    </main>);
}