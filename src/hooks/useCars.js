import { useState, useEffect } from 'react';
import { ENDPOINTS } from '../config/api';

export function useCars(filters = {}) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCars() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(ENDPOINTS.cars, { signal: controller.signal });
        if (!res.ok) throw new Error('Error al cargar los coches');
        const data = await res.json();
        setCars(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
    return () => controller.abort();
  }, []);

  const filtered = cars.filter((car) => {
    if (filters.brands && filters.brands.length > 0 && !filters.brands.includes(car.brand)) return false;
    if (filters.types && filters.types.length > 0 && !filters.types.includes(car.type)) return false;
    if (filters.priceRange && (car.price < filters.priceRange[0] || car.price > filters.priceRange[1])) return false;
    if (filters.kmRange && (car.km < filters.kmRange[0] || car.km > filters.kmRange[1])) return false;
    return true;
  });

  return { cars: filtered, allCars: cars, loading, error };
}
