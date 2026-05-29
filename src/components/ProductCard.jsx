import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { useCartDispatch, CART_ACTIONS } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product, index = 0, compact = false }) {
  const { orderProduct } = useWhatsApp();
  const dispatch = useCartDispatch();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    dispatch({
      type: CART_ACTIONS.ADD,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    });
    addToast(`${product.name} añadido al carrito`, 'success');
  };

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0
  const lowStock = product.stock !== undefined && product.stock <= 5

  return (
    <motion.article
      className="card"
      data-name={product.name}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card-media">
          {product.isNew && <span className="card-badge card-badge-new">Nuevo</span>}
          {discount > 0 && <span className="card-badge card-badge-discount">-{discount}%</span>}
          {lowStock && <span className="card-badge card-badge-stock">Quedan {product.stock}</span>}
          <img
            src={product.image}
            alt={`${product.name} perfume bottle`}
            loading="lazy"
          />
        </div>

        <div className="card-brand">{product.brand}</div>
        <h3>{product.name}</h3>
        <p className="card-desc">{product.description}</p>
        <div className="card-meta">
          <span className="card-notes">{product.notes}</span>
          <span className="card-volume">{product.volume}</span>
        </div>
      </Link>

      {!compact && (
      <div className="card-foot" style={{ flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span className="price" aria-label={`Precio ${product.price} euros`}>
            {product.price.toFixed(2)}€
          </span>
          {product.originalPrice && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'line-through' }}>
              {product.originalPrice.toFixed(2)}€
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            aria-label={`Añadir ${product.name} al carrito`}
            style={{ flex: 1, fontSize: '0.85rem' }}
          >
            Añadir
          </button>
          <button
            className="btn btn-outline"
            onClick={() => orderProduct(product.name)}
            aria-label={`Comprar ${product.name} por WhatsApp`}
            style={{ flex: 1, fontSize: '0.85rem' }}
            title="Comprar por WhatsApp"
          >
            WhatsApp
          </button>
        </div>
      </div>
      )}
    </motion.article>
  );
}
