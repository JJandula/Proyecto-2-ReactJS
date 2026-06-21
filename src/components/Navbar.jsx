import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favorites, togglePanel } = useFavorites();

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          JJ <span>Motors</span>
        </Link>

        <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end onClick={closeMenu}>Inicio</NavLink></li>
          <li><NavLink to="/catalogo" onClick={closeMenu}>Catálogo</NavLink></li>
          <li><NavLink to="/contacto" onClick={closeMenu}>Contacto</NavLink></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="navbar__fav-btn" onClick={togglePanel}>
            ♡ Favoritos
            {favorites.length > 0 && (
              <span className="navbar__fav-count">{favorites.length}</span>
            )}
          </button>
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Menú"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
}
