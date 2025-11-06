import { useState, type Dispatch, type SetStateAction } from "react";
import type { TopicDto } from "../../../models/TopicDto";
import AddTopic from "./AddTopic";
import { CommunityType } from "./CommunityType";
import NameAndDescription from "./NameAndDescription";
import CommunityIcon from "./CommunityIcon";
import { communityApi } from "../../../api_services/community_api/CategoryAPIService";
import type { CommunityDto } from "../../../models/CommunityDto";

interface Props{
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreateCommunityPopup({isOpen, setIsOpen}: Props){

    const [selectedTopics, setSelectedTopics] = useState<TopicDto[]>([]);
    const [currentComponent, setCurrentComponent] = useState<number>(0);
    const [selected, setSelected] = useState<string>('public');
    const [isMature, setIsMature] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [iconPath, setIconPath] = useState<string>("");
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [isValid, setIsValid] = useState<boolean>(false);

    const currentComponentHandler = (next: boolean) => {
      if(next && currentComponent+1 < 4){
        setCurrentComponent(currentComponent + 1);

      }else if(!next && currentComponent-1 > -1){
        setCurrentComponent(currentComponent - 1);
      }
    }

    const createHandler = async () => {

      const communityDto: CommunityDto = {
        name: name,
        description: description,
        communityType: selected,
        isMature: isMature,
        topics: selectedTopics,
        icon: iconFile
      };

      const res = await communityApi.create(communityDto);
      console.log(res);
    };

    if(!isOpen){
        return null;
    }

    return (
    <main className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col bg-[#181c1f] p-6 rounded shadow-lg w-[140vh] h-[70vh] relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {isOpen && (currentComponent === 0 && <AddTopic isOpen={isOpen} selectedTopics = {selectedTopics} setSelectedTopics={setSelectedTopics}/>)}

        {isOpen && (currentComponent === 1 && <CommunityType selected = {selected} isMature={isMature} setSelected={setSelected} setIsMature={setIsMature}/>)}

        {isOpen && (currentComponent === 2 && <NameAndDescription name={name} setName={setName} description={description} setDescription={setDescription} setIsValid={setIsValid}/>)}

        {isOpen && (currentComponent === 3 && <CommunityIcon iconPath={iconPath} setIconPath={setIconPath} setIconFile={setIconFile} name={name} description={description}/>)}

        <div className="ml-auto">

        <button disabled={currentComponent === 0} className={`font-bold py-2 px-2 rounded max-h-10 ${currentComponent === 0 ? "bg-gray-600 opacity-50 cursor-not-allowed" : "bg-[#23272a] hover:bg-[#d93900] cursor-pointer" }`} onClick={() => currentComponentHandler(false)}>Back</button>

        <button disabled={currentComponent === 3 || selectedTopics.length === 0 || (currentComponent === 2 && !isValid)} hidden={currentComponent === 3} className={`font-bold py-2 px-2 rounded max-h-10 ml-3 ${currentComponent === 3 || selectedTopics.length === 0 || (currentComponent === 2 && !isValid) ? "bg-gray-600 opacity-50 cursor-not-allowed" : "bg-[#23272a] hover:bg-[#d93900] cursor-pointer"}`} onClick={() => currentComponentHandler(true)}>Next</button>

        {currentComponent === 3 && (<button  className="bg-[#23272a] hover:bg-[#d93900] font-bold py-2 px-2 rounded max-h-10 ml-3 cursor-pointer" onClick={createHandler}>Create</button>)}

        </div>

      </div>
    </main>
  );

}