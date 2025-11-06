import type { Dispatch, SetStateAction } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";

interface CommunityIconProps{
    iconPath: string;
    setIconPath: Dispatch<SetStateAction<string>>;
    setIconFile: Dispatch<SetStateAction<File | null>>;
    name: string;
    description: string;
}

export default function CommunityIcon({iconPath, setIconPath, setIconFile, name, description}: CommunityIconProps){

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setIconFile(file);
        if(file) setIconPath(URL.createObjectURL(file));
    };

    return(
        <div className="flex flex-col min-w-100">
            <label className="font-bold text-xl mb-4">Community Icon</label>
            <input
                type="file"
                id="file-upload"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}></input>

            <label
                htmlFor="file-upload"  className="px-4 py-2 bg-orange-500 text-white rounded cursor-pointer hover:bg-blue-600 max-w-15"
            ><MdAddPhotoAlternate size={30}/></label>

            {iconPath && <div className="flex mb-18">
                <img src={iconPath} alt="Preview" className="w-24 h-24 rounded-full object-cover mt-6 mb-10"/>
                <div>
                <p className="ml-20 font-bold text-lg">/r{name}</p>
                <p className="ml-20 text-sm max-w-100 break-words">{description}</p>
                </div>
            </div>}

        </div>
    );
}