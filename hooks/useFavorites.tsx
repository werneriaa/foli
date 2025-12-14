import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (val: string) => void;
  removeFromFavorites: (val: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
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
    setFavorites((prev) => {
      if (prev.includes(val)) return prev;
      const next = [...prev, val];
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  const removeFromFavorites = (val: string) => {
    setFavorites((prev) => {
      const next = prev.filter((n) => n !== val);
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
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
