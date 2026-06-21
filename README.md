# JJ Motors 🏎️

> Concesionario de coches premium desarrollado como **Single Page Application** con **React 19 + Vite**. Proyecto académico del Máster en Full Stack Development.

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white">
  <img alt="React Router" src="https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green">
</p>

---

## Tabla de contenidos

- [📝 Descripción del Proyecto](#-descripción-del-proyecto)
- [🚀 Características Principales](#-características-principales)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [⚙️ Requisitos Previos e Instalación](#️-requisitos-previos-e-instalación)
- [📖 Guía de Uso / Ejemplos](#-guía-de-uso--ejemplos)
- [🧱 Arquitectura React](#-arquitectura-react)
- [🧪 Pruebas (Testing)](#-pruebas-testing)
- [🤝 Contribución](#-contribución)
- [🎨 Diseño](#-diseño)
- [📄 Licencia](#-licencia)

---

## 📝 Descripción del Proyecto

**JJ Motors** es una aplicación web de un concesionario de coches deportivos y premium. Permite a los usuarios **explorar un catálogo de vehículos**, **filtrarlos y ordenarlos** según múltiples criterios, **consultar la ficha técnica detallada** de cada coche, **guardar sus favoritos** y **solicitar información** mediante formularios de contacto validados.

### ¿Qué problema resuelve?

Un concesionario necesita un escaparate digital donde el cliente pueda encontrar rápidamente el vehículo que busca sin tener que revisar listados interminables. JJ Motors resuelve esto ofreciendo:

- Una **experiencia de navegación fluida** (SPA, sin recargas de página).
- Un **buscador y sistema de filtros avanzado** para acotar resultados en tiempo real.
- Una **lista de favoritos persistente durante la sesión** para comparar opciones de un vistazo.
- **Canales de contacto** integrados en cada ficha de vehículo.

### Propuesta de valor

Una interfaz **rápida, responsive y de estética premium** construida íntegramente con React y CSS puro (sin librerías de UI de terceros), que demuestra el dominio de los conceptos fundamentales del ecosistema React: enrutamiento, estado global, hooks personalizados, renderizado optimizado y consumo de una API REST.

El proyecto incluye un dataset de **18 vehículos de 6 marcas** (Porsche, BMW, Mercedes, Lexus, Toyota y Cupra) y **7 concesionarios**, servidos a través de una API REST _mock_.

---

## 🚀 Características Principales

| Funcionalidad                         | Descripción                                                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 🏠 **Home dinámica**                  | Hero con CTA, strip de estadísticas, listado de marcas con acceso directo al catálogo filtrado y grid de vehículos destacados.  |
| 🔎 **Catálogo con filtros avanzados** | Búsqueda por texto (marca/modelo), filtro multi-selección por marca y tipo, sliders de rango de precio y kilómetros.            |
| ↕️ **Ordenación**                     | Ordena los resultados por precio (ascendente/descendente) y por año (más reciente).                                             |
| 🔗 **Filtrado por URL**               | Al pulsar una marca en la Home se navega a `/catalogo?marca=BMW`, abriendo el catálogo ya filtrado por esa marca.               |
| 🚗 **Ficha de vehículo**              | Página de detalle con imagen en alta resolución, especificaciones, precio y formulario de contacto integrado.                   |
| ❤️ **Favoritos globales**             | Añade o elimina vehículos de favoritos desde cualquier punto de la app; un panel lateral deslizante muestra la selección.       |
| ✉️ **Formularios validados**          | Formularios de contacto con validación en tiempo real mediante `react-hook-form` (campos obligatorios, formato de email, etc.). |
| 📱 **Diseño responsive**              | Layout _mobile-first_ que adapta el grid de 3 → 2 → 1 columnas según el dispositivo.                                            |
| 🧭 **Navegación SPA**                 | Enrutamiento del lado del cliente con `react-router-dom`, incluyendo página 404 personalizada.                                  |

---

## 🛠️ Stack Tecnológico

### Frontend

| Tecnología                                      | Versión | Uso                                              |
| ----------------------------------------------- | ------- | ------------------------------------------------ |
| [React](https://react.dev/)                     | `19`    | Librería principal de UI                         |
| [React Router DOM](https://reactrouter.com/)    | `7`     | Enrutamiento SPA y query params                  |
| [React Hook Form](https://react-hook-form.com/) | `7`     | Gestión y validación de formularios              |
| CSS custom properties                           | —       | Sistema de diseño y estilos (sin frameworks CSS) |

### Backend / Datos (mock)

| Tecnología                                             | Versión | Uso                             |
| ------------------------------------------------------ | ------- | ------------------------------- |
| [json-server](https://github.com/typicode/json-server) | `1`     | API REST _mock_ sobre `db.json` |

### Tooling / Desarrollo

| Tecnología                                                     | Versión | Uso                                               |
| -------------------------------------------------------------- | ------- | ------------------------------------------------- |
| [Vite](https://vite.dev/)                                      | `8`     | Bundler y servidor de desarrollo (HMR)            |
| [ESLint](https://eslint.org/)                                  | `10`    | Linting de código (incluye reglas de React Hooks) |
| [concurrently](https://github.com/open-cli-tools/concurrently) | `10`    | Ejecución en paralelo de frontend y API           |

---

## 📂 Estructura del Proyecto

```
jj-motors/
├── public/
│   ├── cars/                     # Imágenes locales de los vehículos
│   └── favicon.png
├── src/
│   ├── components/               # Componentes reutilizables
│   │   ├── CarCard.jsx           # Tarjeta de vehículo
│   │   ├── DealerCard.jsx        # Tarjeta de concesionario
│   │   ├── FavoritesPanel.jsx    # Panel lateral de favoritos
│   │   ├── FilterBar.jsx         # Sidebar de filtros con acordeón
│   │   ├── Footer.jsx            # Pie de página
│   │   └── Navbar.jsx            # Barra de navegación (pill flotante)
│   ├── context/
│   │   └── FavoritesContext.jsx  # Estado global de favoritos (Context API)
│   ├── hooks/
│   │   └── useCars.js            # Custom hook: fetch + filtrado de coches
│   ├── pages/                    # Vistas asociadas a rutas
│   │   ├── Home.jsx              # Página de inicio
│   │   ├── Catalog.jsx           # Catálogo con filtros y ordenación
│   │   ├── CarDetail.jsx         # Ficha detalle del vehículo
│   │   └── Contact.jsx           # Página de contacto
│   ├── App.jsx                   # Definición de rutas
│   ├── main.jsx                  # Punto de entrada (Providers + Router)
│   └── index.css                 # Estilos globales (design system)
├── db.json                       # Base de datos mock (json-server)
├── eslint.config.js              # Configuración de ESLint
├── vite.config.js                # Configuración de Vite
└── package.json
```

| Carpeta           | ¿Qué encontrarás aquí?                                                    |
| ----------------- | ------------------------------------------------------------------------- |
| `public/cars/`    | Las imágenes estáticas de los vehículos referenciadas en `db.json`.       |
| `src/components/` | Piezas de UI reutilizables y sin lógica de enrutamiento.                  |
| `src/context/`    | Estado compartido entre toda la app mediante la Context API.              |
| `src/hooks/`      | Hooks personalizados que encapsulan lógica reutilizable (fetch, filtros). |
| `src/pages/`      | Cada archivo es una vista mapeada a una ruta en `App.jsx`.                |

---

## ⚙️ Requisitos Previos e Instalación

### Requisitos previos

- **Node.js** `18` o superior
- **npm** `9` o superior

> 💡 No se requieren variables de entorno. La URL de la API está fijada a `http://localhost:3001` en `src/hooks/useCars.js`.

### Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd jj-motors

# 2. Instalar dependencias
npm install

# 3. Arrancar el frontend y la API mock simultáneamente
npm run dev:all
```

Una vez levantado, la aplicación estará disponible en:

| Servicio                      | URL                   |
| ----------------------------- | --------------------- |
| 🖥️ **Frontend** (Vite)        | http://localhost:5173 |
| 🔌 **API REST** (json-server) | http://localhost:3001 |

### Scripts disponibles

| Script            | Descripción                                                    |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Inicia **solo** el servidor de desarrollo de Vite.             |
| `npm run dev:api` | Inicia **solo** la API mock (json-server en el puerto `3001`). |
| `npm run dev:all` | Inicia **ambos** servidores en paralelo (recomendado).         |
| `npm run build`   | Genera el build de producción en `dist/`.                      |
| `npm run preview` | Previsualiza localmente el build de producción.                |
| `npm run lint`    | Ejecuta ESLint sobre todo el proyecto.                         |

> ⚠️ **Importante:** el frontend necesita que la API esté corriendo para mostrar los vehículos. Usa `npm run dev:all` o arranca `npm run dev:api` en una terminal aparte.

---

## 📖 Guía de Uso / Ejemplos

### Rutas de la aplicación

| Ruta                  | Vista       | Descripción                                                    |
| --------------------- | ----------- | -------------------------------------------------------------- |
| `/`                   | `Home`      | Página de inicio con hero, marcas y destacados.                |
| `/catalogo`           | `Catalog`   | Catálogo completo con filtros y ordenación.                    |
| `/catalogo?marca=BMW` | `Catalog`   | Catálogo pre-filtrado por la marca indicada en el query param. |
| `/catalogo/:id`       | `CarDetail` | Ficha de detalle de un vehículo concreto.                      |
| `/contacto`           | `Contact`   | Información de contacto y formulario.                          |
| `*`                   | 404         | Página "no encontrada" personalizada.                          |

### Endpoints de la API mock

La API REST es generada automáticamente por `json-server` a partir de `db.json`:

```http
GET    /cars          # Lista todos los vehículos
GET    /cars/:id      # Obtiene un vehículo por su ID
GET    /dealers       # Lista todos los concesionarios
```

> `json-server` también expone `POST`, `PUT`, `PATCH` y `DELETE` sobre estos recursos, aunque la aplicación solo consume los endpoints `GET`.

#### Ejemplo de petición

```bash
curl http://localhost:3001/cars/1
```

```json
{
  "id": 1,
  "model": "911 GT3 RS",
  "brand": "Porsche",
  "cv": 575,
  "year": 2025,
  "price": 400000,
  "km": 3000,
  "type": "Sport",
  "image": "/cars/porsche-911-gt3-rs.webp"
}
```

### Modelos de datos

**Vehículo (`car`)**

| Campo   | Tipo         | Ejemplo                            |
| ------- | ------------ | ---------------------------------- |
| `id`    | `number`     | `1`                                |
| `brand` | `string`     | `"Porsche"`                        |
| `model` | `string`     | `"911 GT3 RS"`                     |
| `cv`    | `number`     | `575`                              |
| `year`  | `number`     | `2025`                             |
| `price` | `number` (€) | `400000`                           |
| `km`    | `number`     | `3000`                             |
| `type`  | `string`     | `"Sport"` / `"SUV"` / `"Supercar"` |
| `image` | `string`     | `"/cars/porsche-911-gt3-rs.webp"`  |

**Concesionario (`dealer`)**

| Campo     | Tipo     | Ejemplo                                               |
| --------- | -------- | ----------------------------------------------------- |
| `id`      | `number` | `1`                                                   |
| `brand`   | `string` | `"Porsche"`                                           |
| `address` | `string` | `"Calle Meridional 12, Sant Cugat del Vallès, 08232"` |
| `phone`   | `string` | `"+34 93 123 45 67"`                                  |
| `hours`   | `string` | `"Lun-Sáb 9:00-19:00"`                                |

### Consumir el catálogo desde un componente

El hook `useCars` encapsula el _fetch_ y el filtrado. Acepta un objeto de filtros y devuelve los coches ya filtrados:

```jsx
import { useCars } from "../hooks/useCars";

function Ejemplo() {
  const { cars, allCars, loading, error } = useCars({
    brands: ["BMW", "Porsche"],
    types: ["Sport"],
    priceRange: [0, 200000],
    kmRange: [0, 50000],
  });

  if (loading) return <p>Cargando…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <p>
      {cars.length} de {allCars.length} vehículos coinciden con los filtros.
    </p>
  );
}
```

### Usar el estado global de favoritos

```jsx
import { useFavorites } from "../context/FavoritesContext";

function BotonFavorito({ car }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  return (
    <button onClick={() => toggleFavorite(car)}>
      {isFavorite(car.id) ? "♥ Quitar" : "♡ Guardar"}
    </button>
  );
}
```

---

## 🧱 Arquitectura React

### Conceptos clave implementados

| Concepto                      | Implementación                                                                                |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| **Enrutamiento SPA**          | 4 rutas + 404 con `react-router-dom` en `App.jsx`.                                            |
| **Estado global**             | `FavoritesContext` (Context API) accesible en toda la app.                                    |
| **Custom hook**               | `useCars(filters)` — _fetch_, filtrado y estados de carga/error.                              |
| **`useEffect`**               | Fetch de datos en `useCars` y en `CarDetail` (por ID), bloqueo de scroll en `FavoritesPanel`. |
| **Renderizado optimizado**    | `memo` en `FilterBar`, `useCallback` en handlers y `useMemo` en el filtrado/ordenación.       |
| **Formularios**               | `react-hook-form` con validación en `/contacto` y `/catalogo/:id`.                            |
| **Componentes reutilizables** | `CarCard`, `DealerCard`, `FilterBar`, `FavoritesPanel`.                                       |
| **Responsive**                | CSS puro _mobile-first_ con media queries.                                                    |

### Flujo de datos

```
json-server (puerto 3001)
        │
        ▼
  useCars (hook)        ← filters: brands[], types[], priceRange, kmRange
        │
        ▼
  Catalog.jsx           → FilterBar  +  CarCard[]
        │
        ▼
  FavoritesContext      → Navbar · FavoritesPanel · CarCard · CarDetail
```

---

## 🧪 Pruebas (Testing)

> ⚠️ **Estado actual:** el proyecto **aún no incluye una suite de tests automatizados**. La verificación se realiza de forma manual y mediante el linter.

### Verificación de calidad disponible

```bash
# Análisis estático del código con ESLint
npm run lint
```

### Pruebas manuales recomendadas

1. Arranca el entorno completo con `npm run dev:all`.
2. Comprueba que el catálogo carga los 18 vehículos desde la API.
3. Verifica los filtros (marca, tipo, precio, kilómetros) y la ordenación.
4. Pulsa una marca en la Home y confirma que el catálogo se abre filtrado por esa marca.
5. Añade y elimina favoritos; comprueba que el panel lateral se actualiza.
6. Envía el formulario de contacto con campos vacíos y verifica los mensajes de validación.

### Propuesta a futuro

Para incorporar testing automatizado se recomienda **[Vitest](https://vitest.dev/)** (integración nativa con Vite) junto a **[React Testing Library](https://testing-library.com/)** para tests de componentes e interacción.

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Sigue este flujo de trabajo:

1. **Haz un fork** del repositorio.
2. **Crea una rama** descriptiva para tu cambio:
   ```bash
   git checkout -b feat/nombre-de-la-feature
   ```
3. **Realiza tus cambios** y asegúrate de que pasan el linter:
   ```bash
   npm run lint
   ```
4. **Haz commit** siguiendo la convención de [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: añade comparador de vehículos"
   ```
5. **Sube tu rama** y abre un **Pull Request** describiendo claramente el cambio.

### Guía de estilo

- Componentes en **PascalCase** (`CarCard.jsx`); hooks con prefijo `use` (`useCars.js`).
- Mantén la lógica de datos en **hooks/context** y los componentes centrados en la UI.
- Respeta el sistema de diseño basado en **CSS custom properties** definido en `index.css`.
- Evita introducir dependencias nuevas salvo que aporten un valor claro.

---

## 🎨 Diseño

- **Tema**: oscuro premium con acento rojo (`#c00000`).
- **Tipografía**: Segoe UI / `system-ui`.
- **Navbar**: píldora flotante _sticky_.
- **Responsive**: Desktop (3 columnas) → Tablet (2 columnas) → Mobile (1 columna).
- **Sin librerías de UI**: 100% CSS custom properties.

---

## 📄 Licencia

Proyecto académico desarrollado para el **Máster en FullStack Development — 2026**.

Distribuido con fines educativos. Las imágenes de los vehículos pertenecen a sus respectivas marcas.
