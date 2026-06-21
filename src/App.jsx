import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FavoritesPanel from './components/FavoritesPanel';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CarDetail from './pages/CarDetail';
import Contact from './pages/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <FavoritesPanel />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/catalogo/:id" element={<CarDetail />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={
            <div className="page">
              <div className="container empty-state">
                <div className="empty-state__icon">🔍</div>
                <h2 style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>Página no encontrada</h2>
                <p>La página que buscas no existe.</p>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
