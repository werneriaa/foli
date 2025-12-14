import Link from "next/link";
import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import useFavorites from "../hooks/useFavorites";
import { MdPlace, MdClose } from "react-icons/md";

interface FavoriteList {
  setShowFavorites: Dispatch<SetStateAction<boolean>>;
}

export const FavoriteList: React.FC<FavoriteList> = ({ setShowFavorites }) => {
  const { favorites, removeFromFavorites } = useFavorites();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowFavorites(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowFavorites]);

  if (!favorites || favorites.length === 0) {
    return (
      <div
        ref={dropdownRef}
        className="absolute top-14 bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900 right-0 z-20 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[200px] p-4"
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
          Ei suosikkeja
        </p>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute top-14 bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900 right-0 z-20 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[200px] max-w-[300px]"
    >
      <div className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Suosikit
        </h3>
      </div>
      <ul className="py-2">
        {favorites.map((fav) => {
          return (
            <li
              className="group hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              key={fav.key}
            >
              <div className="flex items-center justify-between px-4 py-2">
                <Link
                  className="flex items-center gap-2 text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 flex-1 min-w-0"
                  href={`/?stop=${fav.key}`}
                  onClick={() => setShowFavorites(false)}
                >
                  <MdPlace className="h-4 w-4 flex-shrink-0" />
                  <span className="font-medium">{fav.key}</span>
                  {fav.name && (
                    <span className="text-gray-500 dark:text-gray-400 text-sm truncate">
                      {fav.name}
                    </span>
                  )}
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromFavorites(fav.key);
                  }}
                  type="button"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded flex-shrink-0"
                  aria-label="Remove from favorites"
                >
                  <MdClose className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
