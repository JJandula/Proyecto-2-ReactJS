import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCars } from '../hooks/useCars';
import CarCard from '../components/CarCard';
import FilterBar from '../components/FilterBar';

const DEFAULT_FILTERS = {
  brands: [],
  types: [],
  priceRange: [0, 800000],
  kmRange: [0, 50000],
};

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => {
    const marca = searchParams.get('marca');
    return marca ? { ...DEFAULT_FILTERS, brands: [marca] } : DEFAULT_FILTERS;
  });
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');

  const { cars, allCars, loading, error } = useCars(filters);

  const handleBrandToggle = useCallback((brand) => {
    setFilters((prev) => {
      const brands = prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands };
    });
  }, []);

  const handleTypeToggle = useCallback((type) => {
    setFilters((prev) => {
      const types = prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type];
      return { ...prev, types };
    });
  }, []);

  const handlePriceChange = useCallback((priceRange) => {
    setFilters((prev) => ({ ...prev, priceRange }));
  }, []);

  const handleKmChange = useCallback((kmRange) => {
    setFilters((prev) => ({ ...prev, kmRange }));
  }, []);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearch('');
    setSortBy('');
  }, []);

  const displayCars = useMemo(() => {
    let result = cars;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) => c.brand.toLowerCase().includes(q) || c.model.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') return [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'year-desc') return [...result].sort((a, b) => b.year - a.year);

    return result;
  }, [cars, search, sortBy]);

  return (
    <div className="page">
      <div className="container">
        <div className="catalog-page-header">
          <h1>Nuestra selección</h1>
          <p className="catalog-page-header__sub">{displayCars.length} vehículos disponibles</p>
        </div>

        <div className="catalog-layout">
          <FilterBar
            filters={filters}
            onBrandToggle={handleBrandToggle}
            onTypeToggle={handleTypeToggle}
            onPriceChange={handlePriceChange}
            onKmChange={handleKmChange}
            onReset={handleReset}
            search={search}
            onSearchChange={setSearch}
            allCars={allCars}
          />

          <div className="catalog-main">
            <div className="catalog-toolbar">
              <span className="catalog-toolbar__count">
                <strong>{displayCars.length}</strong> resultados
              </span>
              <div className="catalog-sort">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="">Ordenar por: Por defecto</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="year-desc">Año: más reciente</option>
                </select>
              </div>
            </div>

            {loading && (
              <div className="loading">
                <div className="loading__spinner" />
                <p>Cargando vehículos...</p>
              </div>
            )}

            {error && (
              <div className="empty-state">
                <div className="empty-state__icon">⚠️</div>
                <p>Error al cargar. ¿Está el servidor API en marcha?</p>
              </div>
            )}

            {!loading && !error && displayCars.length === 0 && (
              <div className="empty-state">
                <div className="empty-state__icon">🚗</div>
                <p>No hay vehículos que coincidan con los filtros.</p>
              </div>
            )}

            {!loading && !error && displayCars.length > 0 && (
              <div className="cars-grid">
                {displayCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
