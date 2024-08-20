import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextProps {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (id: string) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.includes(id) ? prev : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((fav) => fav !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>{children}</FavoritesContext.Provider>
  );
}
