import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (data && Array.isArray(data)) {
        setFavorites(data);
      }
    }
  }, []);

  const addToFavorites = (val: string) => {
    setFavorites([...favorites, val]);
    localStorage.setItem("favorites", JSON.stringify([...favorites, val]));
  };

  const removeFromFavorites = (val: string) => {
    setFavorites((prev) => {
      const next = prev.filter((n) => n !== val);
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  const getFavorites = () => {
    return favorites;
  };

  return { addToFavorites, removeFromFavorites, getFavorites, favorites };
};

export default useFavorites;
