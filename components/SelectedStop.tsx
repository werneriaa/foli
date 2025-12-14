import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { getPrediction } from "../functions/client";
import useFavorites from "../hooks/useFavorites";
import { Results } from "./Results";
import { useQuery } from "@tanstack/react-query";

interface SelectedStop {
  selectedStop: string;
  stop_name: string;
}

export const SelectedStop: React.FC<SelectedStop> = ({
  selectedStop,
  stop_name,
}) => {
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();

  const {
    data: prediction,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["prediction", selectedStop],
    queryFn: () => getPrediction(selectedStop),
    enabled: !!selectedStop,
    select: (data) => {
      if (!data || "message" in data || data.status !== "OK") {
        return undefined;
      }
      return data;
    },
  });

  const error =
    isError || (prediction === undefined && !isLoading && selectedStop);

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
        <p className="w-full py-2 text-center dark:text-gray-300">
          Virhe. Tarkista pysäkin numero ja verkkoyhteytesi
        </p>
      ) : (
        <Results isLoading={isLoading} prediction={prediction} />
      )}
    </div>
  );
};
