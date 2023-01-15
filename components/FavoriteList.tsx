import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import useFavorites from "../hooks/useFavorites";

interface FavoriteList {
  setShowFavorites: Dispatch<SetStateAction<boolean>>;
}

export const FavoriteList: React.FC<FavoriteList> = ({ setShowFavorites }) => {
  const { favorites } = useFavorites();

  return (
    <div className="absolute top-16 bg-white shadow-lg right-4 z-20 list-none w-24 rounded">
      {favorites?.map((n) => {
        return (
          <li className="flex justify-center hover:bg-gray-100" key={n}>
            <Link
              className="px-4 py-2 border-cyan-500 text-center w-full"
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
