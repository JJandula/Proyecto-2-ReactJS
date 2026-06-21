import { useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

const FALLBACK = 'https://picsum.photos/seed/car/200/120';

export default function FavoritesPanel() {
  const { favorites, removeFavorite, isPanelOpen, closePanel } = useFavorites();

  const total = favorites.reduce((sum, car) => sum + car.price, 0);

  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isPanelOpen]);

  return (
    <>
      {isPanelOpen && <div className="fav-overlay" onClick={closePanel} />}

      <aside className={`fav-panel ${isPanelOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="fav-panel__header">
          <div className="fav-panel__header-left">
            <span className="fav-panel__icon">♥</span>
            <div>
              <h3 className="fav-panel__title">Mis favoritos</h3>
              <p className="fav-panel__subtitle">{favorites.length} vehículo{favorites.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button className="fav-panel__close" onClick={closePanel} aria-label="Cerrar">
            <span className="fav-panel__close-icon" />
          </button>
        </div>

        {/* Empty state */}
        {favorites.length === 0 ? (
          <div className="fav-empty">
            <div className="fav-empty__icon">♡</div>
            <p className="fav-empty__title">Sin favoritos aún</p>
            <p className="fav-empty__sub">Guarda los coches que te interesen para verlos aquí.</p>
            <Link to="/catalogo" className="fav-empty__btn" onClick={closePanel}>
              Ver catálogo
            </Link>
          </div>
        ) : (
          <>
            {/* List */}
            <div className="fav-list">
              {favorites.map((car) => (
                <div className="fav-item" key={car.id}>
                  <Link to={`/catalogo/${car.id}`} className="fav-item__link" onClick={closePanel}>
                    <img
                      src={car.image || FALLBACK}
                      alt={`${car.brand} ${car.model}`}
                      className="fav-item__img"
                      onError={(e) => { e.target.src = FALLBACK; }}
                    />
                    <div className="fav-item__info">
                      <p className="fav-item__brand">{car.brand}</p>
                      <p className="fav-item__name">{car.model}</p>
                      <div className="fav-item__tags">
                        <span className="fav-item__tag">{car.year}</span>
                        <span className="fav-item__tag">{car.km === 0 ? 'Nuevo' : `${car.km.toLocaleString()} km`}</span>
                      </div>
                      <p className="fav-item__price">{formatPrice(car.price)}</p>
                    </div>
                  </Link>
                  <button
                    className="fav-item__remove"
                    onClick={() => removeFavorite(car.id)}
                    aria-label="Eliminar de favoritos"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="fav-panel__footer">
              <div className="fav-panel__total">
                <span>Valor total</span>
                <span className="fav-panel__total-price">{formatPrice(total)}</span>
              </div>
              <Link to="/catalogo" className="fav-panel__cta" onClick={closePanel}>
                Ver catálogo completo
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
