/**
 * About.jsx - Sección "Sobre nosotros"
 * 
 * Muestra información sobre tng_shops: su filosofía,
 * valores y lo que ofrece a los clientes.
 */

import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section id="nosotros" className="about" aria-labelledby="about-title">
      <div className="container about-grid">
        {/* Texto informativo */}
        <div>
          <h2 id="about-title">Sobre tng_shops</h2>
          <p>
            Creemos que cada fragancia cuenta una historia. Somos una tienda
            transparente, honesta y que se preocupa por ti. Te asesoramos para
            encontrar tu aroma ideal.
          </p>
          {/* Lista de valores / ventajas */}
          <ul className="bullets">
            <li>Catálogo seleccionado</li>
            <li>Entrega rápida con seguimiento</li>
            <li>Atención personalizada</li>
          </ul>
        </div>

        {/* Imagen del logo */}
        <div className="media-placeholder">
          <img
            src="/images/logo.png"
            alt="Logo tng_shops"
            className="product-img"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
