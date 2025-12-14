import { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { getPrediction } from "../functions/client";
import useFavorites from "../hooks/useFavorites";
import { Results } from "./Results";

interface SelectedStop {
  selectedStop: string;
  stop_name: string;
}

export const SelectedStop: React.FC<SelectedStop> = ({
  selectedStop,
  stop_name,
}) => {
  const [prediction, setPrediction] = useState<Foli.StopPrediction | undefined>(
    undefined,
  );
  const [error, setError] = useState("");
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const retrieve = async () => {
      try {
        if (selectedStop) {
          setError("");
          setIsLoading(true);
          const res = await getPrediction(selectedStop);
          if (!res || "message" in res || res.status !== "OK") {
            throw new Error();
          }
          setPrediction(res);
        } else {
          setPrediction(undefined);
        }
      } catch (_err) {
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
      <h1 className="text-2xl text-gray-500 dark:text-gray-400 font-extralight w-full text-center items-center flex justify-center">
        <span className="text-cyan-500 font-bold">{selectedStop}</span>
        {" - "}
        {stop_name}
        <button
          type="button"
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
      {error ? (
        <p className="w-full py-2 text-center dark:text-gray-300">{error}</p>
      ) : (
        <Results isLoading={isLoading} prediction={prediction} />
      )}
    </div>
  );
};
