import { MdPlace } from "react-icons/md";

interface Suggestios {
  suggestions: Foli.Stop;
  onClick: (key: string) => void;
}

export const Suggestions: React.FC<Suggestios> = ({ suggestions, onClick }) => {
  return (
    <div className="flex flex-col w-full pt-8 text-cyan-500">
      {Object.keys(suggestions).map((key, i) => {
        return (
          <button
            key={key + i}
            className="text-left text-lg flex items-center py-2 px-4 hover:bg-gray-100"
            onClick={() => onClick(key)}
          >
            <MdPlace className="h-6 w-6 mr-2" />
            <span className="font-bold w-16">{key}</span>
            <span className="font-thin ml-4">{suggestions[key].stop_name}</span>
          </button>
        );
      })}
    </div>
  );
};
