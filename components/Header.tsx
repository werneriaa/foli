import Link from "next/link";
import { useState } from "react";
import { FavoriteList } from "./FavoriteList";
import { FoliLogo } from "./FoliLogo";
import { useDarkMode } from "../hooks/useDarkMode";

export const Header: React.FC = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="h-16 w-full flex px-4 py-2 items-center justify-center shadow dark:bg-gray-800 dark:shadow-gray-700">
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
        <div className="w-full h-full flex">
          <Link href="/">
            <FoliLogo />
          </Link>
        </div>
        <div className="relative h-full flex gap-2">
          <button
            className="text-cyan-500 h-full hover:bg-gray-100 dark:hover:bg-gray-700 px-4 rounded"
            onClick={toggleDarkMode}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            type="button"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <button
            className="text-cyan-500 h-full hover:bg-gray-100 dark:hover:bg-gray-700 px-4 rounded"
            onClick={() => setShowFavorites((prev) => !prev)}
            type="button"
          >
            Suosikit
          </button>
          {showFavorites && (
            <FavoriteList setShowFavorites={setShowFavorites} />
          )}
        </div>
      </div>
    </header>
  );
};
