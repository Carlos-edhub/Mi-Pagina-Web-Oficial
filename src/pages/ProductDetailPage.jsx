import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import products from '../data/products';
import { useCartDispatch, CART_ACTIONS } from '../context/CartContext';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { useToast } from '../context/ToastContext';

const REVIEWS = {
  1: [
    { name: 'Carlos M.', rating: 5, date: 'Mar 2026', text: 'Intenso y duradero, perfecto para noche.' },
    { name: 'Andrés G.', rating: 4, date: 'Feb 2026', text: 'Buena fijación, aroma envolvente.' },
  ],
  2: [
    { name: 'Luis P.', rating: 5, date: 'Abr 2026', text: 'Mi perfume diario, fresco y elegante.' },
    { name: 'Jorge R.', rating: 4, date: 'Mar 2026', text: 'Muy agradable, cumple lo prometido.' },
  ],
  3: [
    { name: 'Miguel A.', rating: 5, date: 'Abr 2026', text: 'Espectacular, todos preguntan qué es.' },
    { name: 'David S.', rating: 5, date: 'Mar 2026', text: 'El mejor Lattafa que he probado.' },
  ],
  11: [
    { name: 'Pedro L.', rating: 5, date: 'Abr 2026', text: 'Icono absoluto, calidad premium.' },
    { name: 'Sergio H.', rating: 5, date: 'Feb 2026', text: 'Inigualable, mejor que muchos nicho.' },
    { name: 'Raúl D.', rating: 4, date: 'Ene 2026', text: 'Potente, con 2 sprays basta.' },
  ],
  21: [
    { name: 'María F.', rating: 5, date: 'Abr 2026', text: 'Huele delicioso, reciben muchos cumplidos.' },
    { name: 'Laura T.', rating: 4, date: 'Mar 2026', text: 'Dulce y cálido, perfecto para frío.' },
  ],
  23: [
    { name: 'Ana B.', rating: 5, date: 'Abr 2026', text: 'Femenino y dulce, me encanta.' },
    { name: 'Sofía R.', rating: 4, date: 'Feb 2026', text: 'Muy rico, dura bastante.' },
  ],
};

function StarRating({ rating, size = 'md' }) {
  const sizeMap = { sm: '0.85rem', md: '1.1rem', lg: '1.4rem' };
  return (
    <span style={{ color: 'var(--accent)', fontSize: sizeMap[size] || sizeMap.md, letterSpacing: '2px' }}>
      {'★'.repeat(Math.floor(rating))}{rating % 1 !== 0 ? '½' : ''}{'☆'.repeat(5 - Math.ceil(rating))}
    </span>
  );
}

function NotesPyramid({ notes }) {
  const parts = notes.split(',').map((s) => s.trim());
  if (parts.length < 2) return null;

  const layers = parts.length >= 3
    ? [
        { label: 'Salida', notes: parts.slice(0, 1).join(', '), size: '30%' },
        { label: 'Corazón', notes: parts.slice(1, -1).join(', '), size: '35%' },
        { label: 'Fondo', notes: parts.slice(-1).join(', '), size: '35%' },
      ]
    : [
        { label: 'Salida', notes: parts[0], size: '40%' },
        { label: 'Fondo', notes: parts[1], size: '60%' },
      ];

  return (
    <div className="pyramid">
      {layers.map((layer, i) => (
        <div key={i} className="pyramid-layer" style={{ width: layer.size }}>
          <span className="pyramid-label">{layer.label}</span>
          <span className="pyramid-notes">{layer.notes}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const dispatch = useCartDispatch();
  const { orderProduct } = useWhatsApp();
  const { addToast } = useToast();

  if (!product) {
    return (
      <main id="main-content">
        <section className="shop" style={{ textAlign: 'center', padding: '6rem 0' }}>
          <div className="container">
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Producto no encontrado</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>El perfume que buscas no está disponible.</p>
            <Link to="/tienda" className="btn btn-primary">Ver todos los productos</Link>
          </div>
        </section>
      </main>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: CART_ACTIONS.ADD, product: { id: product.id, name: product.name, price: product.price, image: product.image } });
    addToast(`${product.name} añadido al carrito`, 'success');
  };

  const productReviews = REVIEWS[product.id] || [
    { name: 'Cliente verificado', rating: 4, date: '2026', text: 'Buena relación calidad-precio.' },
    { name: 'Cliente verificado', rating: 5, date: '2026', text: 'Aroma excelente, envío rápido.' },
  ];

  const avgRating = (productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length).toFixed(1);

  const related = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const lowStock = product.stock !== undefined && product.stock <= 5;

  return (
    <main id="main-content">
      <section className="shop" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <Link to="/tienda" className="btn btn-outline" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
            ← Volver a tienda
          </Link>

          <div className="detail-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '400px',
                  border: '1px solid var(--border)',
                  position: 'relative',
                }}
              >
                {product.isNew && <span className="card-badge card-badge-new" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>Nuevo</span>}
                {discount > 0 && <span className="card-badge card-badge-discount" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>-{discount}%</span>}
                {lowStock && <span className="card-badge card-badge-stock" style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>Quedan {product.stock}</span>}
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '400px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span
                style={{
                  display: 'inline-block',
                  background: 'var(--accent-soft)',
                  color: 'var(--accent)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                {product.category}
              </span>

              <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.5px' }}>
                {product.name}
              </h1>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {product.description}
              </p>

              <div
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Precio</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>
                      {product.price.toFixed(2)}€
                    </span>
                    {product.originalPrice && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                        {product.originalPrice.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Volumen</span>
                    <span style={{ fontWeight: 600 }}>{product.volume}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Marca</span>
                    <span style={{ fontWeight: 600 }}>{product.brand}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Valoración</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: 600 }}>{avgRating}</span>
                      <StarRating rating={Math.round(Number(avgRating))} size="sm" />
                    </div>
                  </div>
                </div>
              </div>

              <NotesPyramid notes={product.notes} />

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={handleAddToCart}
                  style={{ flex: 1, minWidth: '180px' }}
                >
                  Añadir al carrito
                </button>
                <button
                  className="btn btn-whatsapp"
                  onClick={() => orderProduct(product.name)}
                  style={{ flex: 1, minWidth: '180px' }}
                >
                  Comprar por WhatsApp
                </button>
              </div>
            </motion.div>
          </div>

          <motion.section
            className="reviews-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Valoraciones</h2>
            <div className="reviews-summary">
              <span className="reviews-avg">{avgRating}</span>
              <div>
                <StarRating rating={Math.round(Number(avgRating))} size="lg" />
                <span className="reviews-count">{productReviews.length} opiniones</span>
              </div>
            </div>
            <div className="reviews-list">
              {productReviews.map((review, i) => (
                <div key={i} className="review-card">
                  <div className="review-head">
                    <span className="review-name">{review.name}</span>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <p className="review-text">{review.text}</p>
                  <span className="review-date">{review.date}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {related.length > 0 && (
            <motion.section
              className="related-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2>Productos relacionados</h2>
              <div className="related-grid">
                {related.map((p) => {
                  const dsc = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
                  const ls = p.stock !== undefined && p.stock <= 5;
                  return (
                    <Link key={p.id} to={`/producto/${p.id}`} className="related-card">
                      <div className="related-card-media">
                        {p.isNew && <span className="card-badge card-badge-new">Nuevo</span>}
                        {dsc > 0 && <span className="card-badge card-badge-discount">-{dsc}%</span>}
                        {ls && <span className="card-badge card-badge-stock">Quedan {p.stock}</span>}
                        <img src={p.image} alt={p.name} loading="lazy" />
                      </div>
                      <div className="related-card-brand">{p.brand}</div>
                      <h3 className="related-card-name">{p.name}</h3>
                      <div className="related-card-price">
                        <span className="price">{p.price.toFixed(2)}€</span>
                        {p.originalPrice && <span className="price-old">{p.originalPrice.toFixed(2)}€</span>}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.section>
          )}
        </div>
      </section>
    </main>
  );
}
