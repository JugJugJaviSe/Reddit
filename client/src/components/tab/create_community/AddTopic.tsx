import { useEffect, useState } from "react";
import type { CategoryAPIResponse } from "../../../types/category/CategoryAPIResponse";
import { categoryApi } from "../../../api_services/category_api/CategoryAPIService";
import type { TopicDto } from "../../../models/TopicDto";
import { LuCircleX } from "react-icons/lu";

interface AddTopicProps{
    isOpen: boolean;
    selectedTopics: TopicDto[];
    setSelectedTopics: React.Dispatch<React.SetStateAction<TopicDto[]>>;
}

export default function AddTopic({isOpen, selectedTopics, setSelectedTopics}: AddTopicProps){

    const [categories, setCategories] = useState<CategoryAPIResponse["data"]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>("");

    useEffect(() =>{

      if(!isOpen) return;
      categoryApi.getCategoriesWithTopics()
      .then(res =>{
        if(res.success && res.data){
          setCategories(res.data);
          setError(null);
        }else{
          setError(res.message || "Failed to load categories");
        }
      }).catch(err => setError(err.message)).finally(() => setLoading(false));
    }, [isOpen]);

    const handleSelectedTopic = (topic: TopicDto) => {
      setSelectedTopics(prev => {
        const alreadySelected = prev.some(t => t.topicId === topic.topicId);

        if (alreadySelected) {
          return prev.filter(t => t.topicId !== topic.topicId);
        } else {
          if (prev.length >= 3) return prev;
          return [...prev, topic];
        }
      });
    };

    return(
        <div>
        <h2 className="text-xl font-bold mb-1">Add Topics</h2>
        <h4 className="mb-2">Add up to 3 topics to help interested redditors find your community.</h4>

        <p>Selected topics {selectedTopics.length}/3</p>

        <input
            type="text"
            placeholder="Filter categories"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 w-full mb-2 mt-2 rounded max-w-120"
          />

        {loading && <p>Loading categories...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="max-h-45 overflow-y-auto">

          {categories && categories.filter(cat => cat.name.toLowerCase().includes(filter.toLowerCase())).map(cat => (
            <div key={cat.categoryId} className="mb-1">
                <strong>{cat.name}</strong>
              <ul className="flex">
                {cat.topics && cat.topics.length > 0 ? (cat.topics.map(top =>(
                  <button
                    key={top.topicId}
                    onClick={(e) => {
                        e.preventDefault();
                        handleSelectedTopic(top);
                    }}
                    className={`mr-4 px-2 py-1 rounded-xl flex items-center justify-between hover:bg-gray-800 ${
                        selectedTopics.some((t) => t.topicId === top.topicId)
                        ? "bg-gray-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                    >
                    <span>{top.name}</span>
                    {selectedTopics.some((t) => t.topicId === top.topicId) && (
                        <LuCircleX className="ml-2 text-white" />
                    )}
                  </button>
                ))) : (<li className="text-gray-400">No topics</li>)
                }
              </ul>
            </div>
          ))}
        </div>
        </div>
    );
}