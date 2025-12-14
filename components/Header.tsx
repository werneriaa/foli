import Link from "next/link";
import { useState } from "react";
import useFavorites from "../hooks/useFavorites";
import { FavoriteList } from "./FavoriteList";
import { FoliLogo } from "./FoliLogo";
import { useDarkMode } from "../hooks/useDarkMode";

export const Header: React.FC = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="h-16 w-full flex px-4 py-2 items-center justify-center shadow dark:bg-gray-800 dark:shadow-gray-700">
      <div className="w-full h-full flex max-w-6xl items-center">
        <Link href="/">
          <FoliLogo />
        </Link>
      </div>
      <div className="relative h-full flex gap-2">
        <button
          className="text-cyan-500 h-full hover:bg-gray-100 dark:hover:bg-gray-700 px-4 rounded"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        <button
          className="text-cyan-500 h-full hover:bg-gray-100 dark:hover:bg-gray-700 px-4 rounded"
          onClick={() => setShowFavorites((prev) => !prev)}
        >
          Suosikit
        </button>
        {showFavorites && <FavoriteList setShowFavorites={setShowFavorites} />}
      </div>
    </header>
  );
};
