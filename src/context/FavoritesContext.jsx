import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const FavoritesContext = createContext(null);

const STORAGE_KEY = 'jj-motors:favorites';

function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

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

// El hook vive junto a su Context por conveniencia; la regla react-refresh
// solo afecta al hot-reload en desarrollo, no al funcionamiento de la app.
// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider');
  return ctx;
}
