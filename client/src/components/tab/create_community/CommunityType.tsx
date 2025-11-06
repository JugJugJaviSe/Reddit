import { type Dispatch, type SetStateAction } from "react";
import { IoMdGlobe } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { TbRating18Plus } from "react-icons/tb";

interface CommunityTypeProps{
    selected: string;
    isMature: boolean;
    setSelected: Dispatch<SetStateAction<string>>;
    setIsMature: Dispatch<SetStateAction<boolean>>;
}

export function CommunityType({selected, isMature, setSelected, setIsMature}: CommunityTypeProps) {

    const communityTypes = [{type: 'public', icon: <IoMdGlobe />, description: "Anyone can view, post, and comment to this community"},
                            {type: 'restricted', icon: <IoMdEye />, description: "Anyone can view, but only approved users can contribute"},
                            {type: 'private', icon: <CiLock />, description: "Only approved users can view and contribute"}];


    return(<div>
        
        <p className="text-xl font-bold mb-2">What kind of community is this?</p>
        <h5 className="mb-4">Decide who can view and contribute in your community. Only public communities show up in search. Important: Once set, you will need to submit a request to change your community type.</h5>

        <div>
            {communityTypes.map(({type, icon, description}) => (
                <label key={type} className={`flex items-center text-xl space-x-2 hover:bg-gray-500 h-15 text-lg border-gray-300 rounded-xl cursor-pointer md-2`}>
                    <input
                        type="radio"
                        name="communityTypes"
                        value={type}
                        checked={selected === type}
                        onChange={() => setSelected(type)}
                        className="accent-[#181c1f]"
                    ></input>
                    <span>{icon}</span>
                    <span>{type}</span>
                    <span className="text-sm text-gray-300 ml-3">{description}</span>
                </label>
            ))}
        </div>

      <div className="flex items-center space-x-3 text-xl mt-4">
      <span className="text-white flex items-center"><TbRating18Plus className="text-xl mr-2"/> Mature content</span>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isMature}
          onChange={() => setIsMature(!isMature)}
          className="sr-only"
        />
        <div
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
            isMature ? "bg-orange-500" : "bg-gray-400"
          }`}
        />
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
            isMature ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </label>

      <span className="text-sm text-gray-300 ml-3">Users must be over 18 to view and contribute</span>
    </div>

    </div>);
}