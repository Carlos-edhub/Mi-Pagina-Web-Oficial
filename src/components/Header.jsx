/**
 * Header.jsx - Barra de navegación superior
 * 
 * Muestra el logo y los enlaces de navegación principales.
 * Es un componente sticky que siempre permanece visible.
 * Usa NavLink de React Router para navegación sin recargar la página.
 */

import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import CartIcon from './CartIcon';
import MegaMenu from './MegaMenu';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <NavLink to="/" className="logo" aria-label="tng_shops - inicio">
          tng_<span>shops</span>
        </NavLink>

        <nav className="nav nav-desktop" role="navigation" aria-label="Navegación principal">
          <NavLink to="/" className="nav-link" end>Inicio</NavLink>
          <NavLink to="/tienda" className="nav-link">Tienda</NavLink>
          <MegaMenu />
          <NavLink to="/blog" className="nav-link">Blog</NavLink>
          <NavLink to="/servicios" className="nav-link">Servicios</NavLink>
          <NavLink to="/nosotros" className="nav-link">Nosotros</NavLink>
          <SearchBar />
          <ThemeToggle />
          <CartIcon />
        </nav>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.5rem 1.5rem 1.5rem' }}>
            <Link to="/" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/tienda" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Tienda</Link>
            <Link to="/categoria/hombre" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>→ Hombre</Link>
            <Link to="/categoria/mujer" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>→ Mujer</Link>
            <Link to="/categoria/unisex" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>→ Unisex</Link>
            <Link to="/blog" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Blog</Link>
            <Link to="/servicios" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Servicios</Link>
            <Link to="/fidelidad" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Fidelidad</Link>
            <Link to="/nosotros" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Nosotros</Link>
            <Link to="/contacto" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Contacto</Link>
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }}>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
