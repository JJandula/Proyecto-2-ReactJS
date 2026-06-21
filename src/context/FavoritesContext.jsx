import { createContext, useContext, useState, useCallback } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const toggleFavorite = useCallback((car) => {
    setFavorites((prev) => {
      const exists = prev.some((c) => c.id === car.id);
      return exists ? prev.filter((c) => c.id !== car.id) : [...prev, car];
    });
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((c) => c.id === id),
    [favorites]
  );

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const togglePanel = useCallback(() => setIsPanelOpen((prev) => !prev), []);
  const closePanel = useCallback(() => setIsPanelOpen(false), []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, removeFavorite, isPanelOpen, togglePanel, closePanel }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider');
  return ctx;
}
