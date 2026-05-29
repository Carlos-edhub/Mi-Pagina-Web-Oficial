import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartDispatch, CART_ACTIONS } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const FEATURED_IDS = [11, 1, 21, 3, 12, 23, 14, 30];

export default function FeaturedCarousel({ products }) {
  const featured = products.filter((p) => FEATURED_IDS.includes(p.id));
  const scrollRef = useRef(null);
  const [canScrollL, setCanScrollL] = useState(false);
  const [canScrollR, setCanScrollR] = useState(true);
  const dispatch = useCartDispatch();
  const { addToast } = useToast();

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollL(el.scrollLeft > 4);
    setCanScrollR(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows);
    updateArrows();
    return () => el.removeEventListener('scroll', updateArrows);
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amt = el.clientWidth * 0.66;
    el.scrollBy({ left: dir * amt, behavior: 'smooth' });
  };

  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD, product: { id: product.id, name: product.name, price: product.price, image: product.image } });
    addToast(`${product.name} añadido al carrito`, 'success');
  };

  if (featured.length === 0) return null;

  return (
    <section className="featured-section" aria-labelledby="featured-title">
      <div className="container">
        <header className="featured-head">
          <div>
            <h2 id="featured-title"><span>M</span>ás vendidos</h2>
            <p>Los favoritos de nuestros clientes</p>
          </div>
          <div className="featured-arrows">
            <button className="featured-arrow" onClick={() => scroll(-1)} disabled={!canScrollL} aria-label="Anterior">
              ‹
            </button>
            <button className="featured-arrow" onClick={() => scroll(1)} disabled={!canScrollR} aria-label="Siguiente">
              ›
            </button>
          </div>
        </header>

        <div className="featured-track" ref={scrollRef}>
          {featured.map((product) => {
            const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
            const lowStock = product.stock !== undefined && product.stock <= 5;
            return (
              <article key={product.id} className="featured-card">
                <Link to={`/producto/${product.id}`} className="featured-card-link">
                  <div className="featured-card-media">
                    {product.isNew && <span className="card-badge card-badge-new">Nuevo</span>}
                    {discount > 0 && <span className="card-badge card-badge-discount">-{discount}%</span>}
                    {lowStock && <span className="card-badge card-badge-stock">Quedan {product.stock}</span>}
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </div>
                  <div className="featured-card-brand">{product.brand}</div>
                  <h3 className="featured-card-name">{product.name}</h3>
                  <div className="featured-card-price">
                    <span className="price">{product.price.toFixed(2)}€</span>
                    {product.originalPrice && <span className="price-old">{product.originalPrice.toFixed(2)}€</span>}
                  </div>
                </Link>
                <button className="btn btn-primary btn-sm" onClick={() => addToCart(product)}>
                  Añadir
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
