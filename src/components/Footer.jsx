import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">tng_shops</h4>
            <p className="footer-col-desc">Tu tienda de fragancias de confianza. Perfumes originales con los mejores precios.</p>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Tienda</h4>
            <Link to="/tienda" className="footer-link">Todos los productos</Link>
            <Link to="/categoria/hombre" className="footer-link">Hombre</Link>
            <Link to="/categoria/mujer" className="footer-link">Mujer</Link>
            <Link to="/categoria/unisex" className="footer-link">Unisex</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Servicios</h4>
            <Link to="/servicios" className="footer-link">Tarjeta regalo</Link>
            <Link to="/servicios" className="footer-link">Click & Collect</Link>
            <Link to="/fidelidad" className="footer-link">Programa de puntos</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Ayuda</h4>
            <Link to="/nosotros" className="footer-link">Sobre nosotros</Link>
            <Link to="/contacto" className="footer-link">Contacto</Link>
            <Link to="/servicios" className="footer-link">Preguntas frecuentes</Link>
            <Link to="/blog" className="footer-link">Blog</Link>
          </div>
        </div>
        <Newsletter variant="bar" />
        <div className="footer-bottom">
          <p>© {year} tng_shops. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
