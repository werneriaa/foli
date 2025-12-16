import { MdLocationOn } from "react-icons/md";

interface ResultRow {
  line: string;
  destination: string;
  departureTime: number;
  longitude?: number;
  latitude?: number;
  onMapClick: () => void;
}

const getMinutesUntilArrival = (departureTime: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const diffSeconds = departureTime - now;
  const diffMinutes = Math.floor(diffSeconds / 60);

  if (diffMinutes < 1) return "Nyt";
  if (diffMinutes === 1) return "1 min";
  return `${diffMinutes} min`;
};

export const ResultRow: React.FC<ResultRow> = ({
  line,
  destination,
  departureTime,
  longitude,
  latitude,
  onMapClick,
}) => {
  const hasLocation =
    latitude !== 0 && longitude !== 0 && !!latitude && !!longitude;

  return (
    <tr className="w-full flex border-b border-b-gray-300 dark:border-b-gray-700 last:border-none py-4 text-gray-500 dark:text-gray-400 font-light items-center">
      <td className="w-1/5 pr-2">{line}</td>
      <td className="w-2/5 px-2 truncate">{destination}</td>
      <td className="w-1/5 px-2 text-center font-medium text-cyan-600 dark:text-cyan-400">
        {getMinutesUntilArrival(departureTime)}
      </td>
      <td
        className={`w-1/5 pl-2 text-right flex items-center justify-end gap-2`}
      >
        <span>
          {new Date(departureTime * 1000).toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        {hasLocation ? (
          <button
            type="button"
            onClick={onMapClick}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-cyan-500 mr-3"
            title="Näytä bussin sijainti kartalla"
          >
            <MdLocationOn className="h-5 w-5" />
          </button>
        ) : (
          <div className="h-7 w-7 mr-3 bg-transparent" />
        )}
      </td>
    </tr>
  );
};
