/**
 * Home.jsx - Página principal de tng_shops
 * 
 * Es la página de aterrizaje que combina:
 * - Hero (bienvenida llamativa)
 * - Badges (ventajas)
 * - Tienda (productos destacados)
 * - Nosotros (información de la marca)
 * - Contacto
 * 
 * Es una página de una sola sección que muestra todo el contenido,
 * ideal para captar clientes desde el primer vistazo.
 */

import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Badges from '../components/Badges';
import Testimonials from '../components/Testimonials';
import BrandsSection from '../components/BrandsSection';
import ProductGrid from '../components/ProductGrid';
import FeaturedCarousel from '../components/FeaturedCarousel';
import CollectionsShowcase from '../components/CollectionsShowcase';
import About from '../components/About';
import Contact from '../components/Contact';
import Newsletter from '../components/Newsletter';
import products from '../data/products';

export default function Home() {
  return (
    <>
      <SEO description="Perfumes originales Lattafa y Armaf. Envío rápido y asesoría personal por WhatsApp. Las mejores fragancias orientales al mejor precio." />
      <main id="main-content">
      <Hero />
      <Badges />
      <Testimonials />
      <BrandsSection />
      <CollectionsShowcase />
      <FeaturedCarousel products={products} />
      <section id="tienda" className="shop" aria-labelledby="shop-title">
        <div className="container">
          <header className="shop-head">
            <div>
              <h2 id="shop-title"><span>T</span>ienda</h2>
              <p>Explora nuestras fragancias más buscadas</p>
            </div>
          </header>
          <ProductGrid products={products} />
        </div>
      </section>
      <About />
      <Newsletter />
      <Contact />
    </main>
    </>
  );
}
