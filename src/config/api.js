// URL base de la API. Configurable mediante la variable de entorno VITE_API_URL
// (ver .env.example). Si no se define, se usa el servidor json-server local.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const ENDPOINTS = {
  cars: `${API_URL}/cars`,
  dealers: `${API_URL}/dealers`,
  messages: `${API_URL}/messages`,
};
