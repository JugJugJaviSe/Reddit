import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { categoryApi } from "../../../api_services/category_api/CategoryAPIService";
import type { CategoryAPIResponse } from "../../../types/category/CategoryAPIResponse";
import type { TopicDto } from "../../../models/TopicDto";
import AddTopic from "./AddTopic";

interface Props{
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreateCommunityPopup({isOpen, setIsOpen}: Props){

    if(!isOpen){
        return null;
    }

    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#181c1f] p-6 rounded shadow-lg w-200 h-100 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {isOpen && <AddTopic isOpen={isOpen}/>}

      </div>
    </div>
  );

}