import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCars } from '../hooks/useCars';
import CarCard from '../components/CarCard';

const BRANDS = ['Porsche', 'BMW', 'Mercedes', 'Lexus', 'Toyota', 'Cupra'];

export default function Home() {
  const { cars, loading } = useCars();
  const featured = useMemo(() => cars.slice(0, 3), [cars]);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero__eyebrow">
            <span className="hero__dot" />
            Concesionario Premium · Barcelona
          </div>
          <h1>
            El coche que buscas,<br />
            <span>al precio que mereces</span>
          </h1>
          <p>
            Nuevo y de ocasión. Las mejores marcas del mercado
            seleccionadas por nuestros expertos.
          </p>
          <div className="hero__actions">
            <Link to="/catalogo" className="btn btn--primary">
              Ver catálogo
            </Link>
            <Link to="/contacto" className="btn btn--outline">
              Hablar con un asesor
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-strip">
            <div className="stats-strip__item">
              <span className="stats-strip__num">18<span> +</span></span>
              <span className="stats-strip__label">Vehículos en stock</span>
            </div>
            <div className="stats-strip__divider" />
            <div className="stats-strip__item">
              <span className="stats-strip__num">6</span>
              <span className="stats-strip__label">Marcas premium</span>
            </div>
            <div className="stats-strip__divider" />
            <div className="stats-strip__item">
              <span className="stats-strip__num">10<span> +</span></span>
              <span className="stats-strip__label">Años de experiencia</span>
            </div>
            <div className="stats-strip__divider" />
            <div className="stats-strip__item">
              <span className="stats-strip__num">100<span> %</span></span>
              <span className="stats-strip__label">Satisfacción garantizada</span>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="brands-strip-section">
        <div className="container">
          <p className="brands-strip__label">Nuestras marcas</p>
          <div className="brands-strip">
            {BRANDS.map((brand) => (
              <Link key={brand} to={`/catalogo?marca=${encodeURIComponent(brand)}`} className="brands-strip__item">
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-header">
            <div>
              <p className="featured-header__eyebrow">Selección editorial</p>
              <h2 className="featured-header__title">Vehículos destacados</h2>
            </div>
            <Link to="/catalogo" className="btn btn--outline">
              Ver todos →
            </Link>
          </div>

          {loading ? (
            <div className="loading">
              <div className="loading__spinner" />
              <p>Cargando vehículos...</p>
            </div>
          ) : (
            <div className="cars-grid">
              {featured.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
