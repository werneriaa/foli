import Link from "next/link";
import { useState } from "react";
import useFavorites from "../hooks/useFavorites";
import { FavoriteList } from "./FavoriteList";
import { FoliLogo } from "./FoliLogo";

export const Header: React.FC = () => {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <header className="h-16 w-full flex px-4 py-2 items-center justify-center shadow">
      <div className="w-full h-full flex max-w-6xl items-center">
        <Link href="/">
          <FoliLogo />
        </Link>
      </div>
      <button
        className="text-cyan-500 h-full hover:bg-gray-100 px-4 rouned relative"
        onClick={() => setShowFavorites((prev) => !prev)}
      >
        Suosikit
      </button>
      {showFavorites && <FavoriteList setShowFavorites={setShowFavorites} />}
    </header>
  );
};
