import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import useFavorites from "../hooks/useFavorites";

interface FavoriteList {
  setShowFavorites: Dispatch<SetStateAction<boolean>>;
}

export const FavoriteList: React.FC<FavoriteList> = ({ setShowFavorites }) => {
  const { favorites } = useFavorites();

  return (
    <div className="absolute top-14 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 right-0 z-20 list-none w-24 rounded">
      {favorites?.map((n) => {
        return (
          <li className="flex justify-center hover:bg-gray-100 dark:hover:bg-gray-700" key={n}>
            <Link
              className="px-4 py-2 border-cyan-500 dark:text-gray-300 text-center w-full"
              href={`/?stop=${n}`}
              onClick={() => setShowFavorites(false)}
            >
              {n}
            </Link>
          </li>
        );
      })}
    </div>
  );
};
