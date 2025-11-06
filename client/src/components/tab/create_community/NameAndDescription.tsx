import { useState, type Dispatch, type SetStateAction } from "react";
import type { ValidationResult } from "../../../types/validation/ValidationResult";
import { validateCreateCommunityData } from "../../../api_services/validators/CreateCommunityValidator";


interface NameAndDescriptionProps{
    name: string;
    description: string;
    setName: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setIsValid: Dispatch<SetStateAction<boolean>>;
}

export default function NameAndDescription({name, description, setName, setDescription, setIsValid}: NameAndDescriptionProps){

    const [errorMessage, setErrorMessage] = useState<string>("");

    const validate = () => {
        const validationResult: ValidationResult = validateCreateCommunityData(name, description);

        if(!validationResult.success){
            setErrorMessage(validationResult.message ?? "Invalid data");
            setIsValid(false);
            return;
        }else{
            setErrorMessage("");
            setIsValid(true);
        }
    }

    return(<div>
        <p className="font-bold text-xl mb-2">Tell us about your community</p>
        <p className="mb-3">A name and description help people understand what your community is all about.</p>

        <div className="flex flex-col max-w-100">
        <input
            type="text"
            placeholder="Enter community name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={validate}
            className="p-2 border border-gray-300 rounded w-100 mt-4"></input>

        <p className={`mb-2 ml-auto text-sm ${name.length > 30 ? "text-red-500" : "text-white"}`}>{name.length}/30</p>
        </div>

        <div className="flex flex-col max-w-100">
        <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={validate}
            className="w-full h-30 p-2 border border-gray-300 rounded max-w-100 mt-`"></textarea>
        <p></p>

        <p className={`ml-auto text-sm ${description.length > 150 ? "text-red-500" : "text-white"}`}>{description.length}/150</p>
        </div>

        {errorMessage && (<p className="text-red-500">{errorMessage}</p>)}

    </div>);
}