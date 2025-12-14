import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";

export interface Favorite {
  key: string;
  name: string;
}

interface FavoritesContextType {
  favorites: Favorite[];
  addToFavorites: (key: string, name: string) => void;
  removeFromFavorites: (key: string) => void;
  isFavorite: (key: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (data && Array.isArray(data)) {
        // Migration: convert old string[] format to Favorite[] format
        const migrated = data.map((item: string | Favorite) =>
          typeof item === "string" ? { key: item, name: "" } : item,
        );
        setFavorites(migrated);
      }
    }
  }, []);

  const addToFavorites = (key: string, name: string) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.key === key)) return prev;
      const next = [...prev, { key, name }];
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  const removeFromFavorites = (key: string) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.key !== key);
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (key: string) => favorites.some((f) => f.key === key);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export default useFavorites;
