import { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { getPrediction } from "../functions/client";
import useFavorites from "../hooks/useFavorites";
import { ResultRow } from "./ResultRow";

interface SelectedStop {
  selectedStop: string;
  stop_name: string;
}

export const SelectedStop: React.FC<SelectedStop> = ({
  selectedStop,
  stop_name,
}) => {
  const [prediction, setPrediction] = useState<Foli.StopPrediction | undefined>(
    undefined
  );
  const [error, setError] = useState("");
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const retrieve = async () => {
      try {
        if (selectedStop) {
          setIsLoading(true);
          const res = await getPrediction(selectedStop);
          if (!res?.status || res.status !== "OK") throw new Error();
          setPrediction(res);
        } else {
          setPrediction(undefined);
        }
      } catch (err) {
        setError("Virhe. Tarkista pysäkin numero ja verkkoyhteytesi");
        setPrediction(undefined);
      } finally {
        setIsLoading(false);
      }
    };
    retrieve();
  }, [selectedStop]);

  return (
    <div className="mt-4">
      <h1 className="text-2xl text-gray-500 font-extralight w-full text-center items-center flex justify-center">
        <span className="text-cyan-500 font-bold">{selectedStop}</span>
        {" - "}
        {stop_name}
        <button
          className="ml-2"
          onClick={() => {
            if (favorites.includes(selectedStop)) {
              removeFromFavorites(selectedStop);
            } else {
              addToFavorites(selectedStop);
            }
          }}
        >
          {favorites.includes(selectedStop) ? (
            <MdFavorite />
          ) : (
            <MdFavoriteBorder />
          )}
        </button>
      </h1>
      {isLoading && (
        <div className="flex justify-center items-center mt-8">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-cyan-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {!isLoading && error ? (
        <p className="w-full py-2 text-center">{error}</p>
      ) : (
        <table className="mt-4 w-full grid" data-testid="result-table">
          <thead>
            <tr className="flex w-full mb-2">
              <th className="w-full text-left">Linja</th>
              <th className="w-full text-left pl-4">Päämäärä</th>
              <th className="w-full text-right">Arvioitu lähtöaika</th>
            </tr>
          </thead>
          <tbody>
            {prediction?.result.map((res, i) => (
              <ResultRow
                line={res.lineref}
                departureTime={res.expecteddeparturetime}
                key={res.lineref + i}
                destination={res.destinationdisplay}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
