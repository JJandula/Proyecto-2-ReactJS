import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setError(null);
    try {
      const res = await fetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'contacto',
          createdAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('No se pudo enviar el mensaje');
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError('No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Contacto</h1>
          <p>Estamos aquí para ayudarte a encontrar tu coche ideal</p>
        </div>

        <div className="contact-layout">
          <div className="contact-info">
            <h2>Habla con nosotros</h2>
            <p>
              Nuestro equipo de expertos está listo para asesorarte sobre cualquier
              vehículo de nuestro catálogo. Rellena el formulario y nos pondremos
              en contacto contigo en menos de 24 horas.
            </p>
            <div className="contact-info__item">
              <span>📞</span>
              <span>+34 93 100 00 00</span>
            </div>
            <div className="contact-info__item">
              <span>✉️</span>
              <span>info@jjmotors.es</span>
            </div>
            <div className="contact-info__item">
              <span>📍</span>
              <span>Carrer de la Unió 48, 08221 Terrassa</span>
            </div>
            <div className="contact-info__item">
              <span>🕐</span>
              <span>Lunes a Sábado, 9:00 – 19:00</span>
            </div>
          </div>

          <div className="form-card">
            <h3 className="form-title">Solicitar información</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-group">
                <label>Nombre completo *</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  {...register('name', { required: 'El nombre es obligatorio' })}
                />
                {errors.name && <span className="form-error">{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  {...register('email', {
                    required: 'El email es obligatorio',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email no válido' },
                  })}
                />
                {errors.email && <span className="form-error">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  placeholder="+34 600 000 000"
                  {...register('phone')}
                />
              </div>

              <div className="form-group">
                <label>Vehículo de interés</label>
                <select {...register('vehicle')}>
                  <option value="">Selecciona un modelo</option>
                  <option value="Porsche 911 GT3 RS">Porsche 911 GT3 RS</option>
                  <option value="BMW M3">BMW M3</option>
                  <option value="BMW M4">BMW M4</option>
                  <option value="Mercedes AMG GT">Mercedes AMG GT</option>
                  <option value="Lexus LFA">Lexus LFA</option>
                  <option value="Toyota Supra GR">Toyota Supra GR</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label>Mensaje *</label>
                <textarea
                  placeholder="Cuéntanos qué buscas..."
                  {...register('message', { required: 'El mensaje es obligatorio' })}
                />
                {errors.message && <span className="form-error">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                className="btn btn--primary"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </button>

              {submitted && (
                <div className="form-success">
                  ✓ Mensaje enviado correctamente. Te contactaremos pronto.
                </div>
              )}

              {error && <span className="form-error">{error}</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
