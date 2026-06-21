import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
}

const FALLBACK = 'https://picsum.photos/seed/car/600/400';

export default function CarCard({ car }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isNew = car.km === 0;
  const fav = isFavorite(car.id);

  return (
    <article className="car-card">
      <Link to={`/catalogo/${car.id}`} className="car-card__inner">
        <div className="car-card__img-wrap">
          <img
            src={car.image || FALLBACK}
            alt={`${car.brand} ${car.model}`}
            className="car-card__img"
            loading="lazy"
            onError={(e) => { e.target.src = FALLBACK; }}
          />
        </div>

        <div className="car-card__body">
          <h3 className="car-card__title">{car.brand} {car.model}</h3>
          <p className="car-card__subtitle">{car.cv} CV &middot; {car.type}</p>

          <p className="car-card__price-label">Precio</p>
          <p className="car-card__price">{formatPrice(car.price)}</p>

          <div className="car-card__tags">
            <span className="car-card__tag">{car.year}</span>
            <span className="car-card__tag">{isNew ? 'Nuevo' : `${car.km.toLocaleString()} km`}</span>
          </div>
        </div>
      </Link>

      <button
        className={`car-card__fav-btn ${fav ? 'active' : ''}`}
        onClick={() => toggleFavorite(car)}
        aria-label="Añadir a favoritos"
      >
        {fav ? '♥' : '♡'}
      </button>
    </article>
  );
}
