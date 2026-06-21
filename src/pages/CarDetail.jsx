import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useFavorites } from '../context/FavoritesContext';

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

const FALLBACK = 'https://picsum.photos/seed/car/900/500';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCar() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/cars/${id}`, { signal: controller.signal });
        if (!res.ok) throw new Error('Coche no encontrado');
        const data = await res.json();
        setCar(data);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCar();
    return () => controller.abort();
  }, [id]);

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 700));
    console.log('Consulta enviada:', data);
    setSent(true);
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container loading">
          <div className="loading__spinner" />
          <p>Cargando vehículo...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="page">
        <div className="container empty-state">
          <div className="empty-state__icon">🚗</div>
          <p>Vehículo no encontrado.</p>
          <Link to="/catalogo" className="btn btn--primary" style={{ marginTop: '1rem' }}>
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const isNew = car.km === 0;
  const fav = isFavorite(car.id);

  return (
    <div className="page">
      <div className="container">
        <button className="detail-back" onClick={() => navigate(-1)}>
          Volver al catálogo
        </button>

        <div className="detail-layout">
          {/* LEFT COLUMN */}
          <div className="detail-main">
            <img
              src={car.image || FALLBACK}
              alt={`${car.brand} ${car.model}`}
              className="detail-img"
              onError={(e) => { e.target.src = FALLBACK; }}
            />

            <div className="detail-section">
              <h2 className="detail-section__title">Detalles</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {car.brand} presenta el <strong style={{ color: 'var(--white)' }}>{car.model}</strong>,
                un vehículo {car.type.toLowerCase()} de {car.year} con {car.cv} CV de potencia.
                {isNew
                  ? ' Unidad nueva, sin kilómetros previos.'
                  : ` Con ${car.km.toLocaleString()} km registrados y en perfecto estado.`}
              </p>
            </div>

            <div className="detail-section detail-section--specs">
              <p className="detail-section__eyebrow">Especificaciones</p>
              <h2 className="detail-section__title">Datos básicos</h2>
              <div className="detail-specs-grid">
                <div className="detail-spec">
                  <div className="detail-spec__label">Año</div>
                  <div className="detail-spec__value">{car.year}</div>
                </div>
                <div className="detail-spec">
                  <div className="detail-spec__label">Potencia</div>
                  <div className="detail-spec__value">{car.cv} <span className="detail-spec__unit">CV</span></div>
                </div>
                <div className="detail-spec">
                  <div className="detail-spec__label">Kilómetros</div>
                  <div className="detail-spec__value">{isNew ? 'Nuevo' : `${car.km.toLocaleString()} km`}</div>
                </div>
                <div className="detail-spec">
                  <div className="detail-spec__label">Tipo</div>
                  <div className="detail-spec__value">{car.type}</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="detail-sidebar">
            {/* Info card */}
            <div className="detail-info-card">
              <h1 className="detail-car-name">{car.brand} {car.model}</h1>

              <div className="detail-tags">
                <span className="detail-tag">{car.year}</span>
                <span className="detail-tag">{isNew ? 'Nuevo' : `${car.km.toLocaleString()} km`}</span>
                <span className="detail-tag">{car.cv} CV</span>
                <span className="detail-tag">{car.type}</span>
              </div>

              <p className="detail-price-label">Precio</p>
              <p className="detail-price">{formatPrice(car.price)}</p>

              <a className="detail-btn-primary" href="tel:+34931000000">
                📞 Llamar ahora
              </a>
              <button
                className="detail-btn-outline"
                onClick={() => toggleFavorite(car)}
              >
                {fav ? '♥ En favoritos' : '♡ Añadir a favoritos'}
              </button>
            </div>

            {/* Contact mini-form */}
            <div className="detail-form-card">
              <h3 className="detail-form-title">
                Quiero más información <span>de este coche</span>
              </h3>

              {sent ? (
                <div className="form-success">
                  Consulta enviada. Nos pondremos en contacto contigo pronto.
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="detail-form-row">
                    <div className="detail-form-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        placeholder="Nombre"
                        {...register('nombre', { required: true })}
                        style={errors.nombre ? { borderColor: '#ef4444' } : {}}
                      />
                    </div>
                    <div className="detail-form-group">
                      <label>Apellido</label>
                      <input
                        type="text"
                        placeholder="Apellido"
                        {...register('apellido', { required: true })}
                        style={errors.apellido ? { borderColor: '#ef4444' } : {}}
                      />
                    </div>
                  </div>

                  <div className="detail-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="email@gmail.com"
                      {...register('email', { required: true })}
                      style={errors.email ? { borderColor: '#ef4444' } : {}}
                    />
                  </div>

                  <div className="detail-form-group">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      placeholder="666 000 000"
                      {...register('telefono')}
                    />
                  </div>

                  <div className="detail-form-group">
                    <label>Mensaje</label>
                    <textarea
                      defaultValue={`Estoy interesado en el ${car.brand} ${car.model}`}
                      {...register('mensaje', { required: true })}
                      style={errors.mensaje ? { borderColor: '#ef4444' } : {}}
                    />
                  </div>

                  <button
                    type="submit"
                    className="detail-btn-primary"
                    disabled={isSubmitting}
                    style={{ marginBottom: 0 }}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
