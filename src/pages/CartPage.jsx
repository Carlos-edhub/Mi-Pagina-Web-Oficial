/**
 * CartPage.jsx - Página del carrito de compras
 *
 * Muestra los productos del carrito con controles de cantidad,
 * resumen del pedido y checkout por WhatsApp.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart, useCartDispatch, CART_ACTIONS } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

export default function CartPage() {
  const { items, totalItems, totalPrice } = useCart();
  const dispatch = useCartDispatch();
  const { addToast } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) return;
    const productList = items
      .map((item) => `• ${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)}€`)
      .join('\n');

    const message = `Hola, quiero hacer este pedido desde tng_shops:\n\n${productList}\n\nTotal: ${totalPrice.toFixed(2)}€`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/34663079312?text=${encoded}`, '_blank', 'width=600,height=600');
    addToast('Pedido enviado a WhatsApp', 'success');
  };

  const handleClearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR });
    addToast('Carrito vaciado', 'info');
  };

  if (items.length === 0) {
    return (
      <main id="main-content">
        <section className="shop" style={{ textAlign: 'center', padding: '6rem 0' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Tu carrito está vacío</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.125rem' }}>
                Aún no has añadido ningún perfume. ¡Explora nuestra tienda!
              </p>
              <Link to="/tienda" className="btn btn-primary">Ir a la tienda</Link>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content">
      <section className="shop" aria-labelledby="cart-title">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 id="cart-title" style={{ margin: 0, fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
                Tu carrito
              </h2>
              <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)' }}>
                {totalItems} producto{totalItems !== 1 ? 's' : ''}
              </p>
            </div>
            <button className="btn btn-outline" onClick={handleClearCart} style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}>
              Vaciar carrito
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255,255,255,0.02)',
                    padding: '0.5rem',
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{item.name}</h3>
                  <p style={{ margin: '0.25rem 0 0', color: 'var(--accent)', fontWeight: 700 }}>
                    {item.price.toFixed(2)}€
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    className="btn btn-outline"
                    onClick={() => dispatch({ type: CART_ACTIONS.UPDATE_QTY, id: item.id, quantity: item.quantity - 1 })}
                    disabled={item.quantity <= 1}
                    style={{ padding: '0.25rem 0.6rem', minWidth: '32px', fontSize: '1rem' }}
                    aria-label={`Reducir cantidad de ${item.name}`}
                  >−</button>

                  <span style={{ fontWeight: 600, minWidth: '24px', textAlign: 'center', color: 'var(--text)' }}>
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-outline"
                    onClick={() => dispatch({ type: CART_ACTIONS.UPDATE_QTY, id: item.id, quantity: item.quantity + 1 })}
                    style={{ padding: '0.25rem 0.6rem', minWidth: '32px', fontSize: '1rem' }}
                    aria-label={`Aumentar cantidad de ${item.name}`}
                  >+</button>
                </div>

                <div style={{ textAlign: 'right', minWidth: '80px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text)' }}>
                    {(item.price * item.quantity).toFixed(2)}€
                  </span>
                </div>

                <button
                  onClick={() => {
                    dispatch({ type: CART_ACTIONS.REMOVE, id: item.id });
                    addToast(`${item.name} eliminado del carrito`, 'info');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    padding: '0.25rem',
                    transition: 'color 0.2s',
                  }}
                  aria-label={`Eliminar ${item.name} del carrito`}
                >✕</button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              marginTop: '2rem',
              padding: '1.5rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--surface)',
              textAlign: 'right',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Total:</span>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent)' }}>
                {totalPrice.toFixed(2)}€
              </span>
            </div>
            <p style={{ margin: '0.5rem 0 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {totalItems} producto{totalItems !== 1 ? 's' : ''} · Envío consultar por WhatsApp
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <Link to="/tienda" className="btn btn-outline">Seguir comprando</Link>
              <button className="btn btn-whatsapp" onClick={handleCheckout}>Pedir por WhatsApp</button>
            </div>
          </motion.div>

          <div className="cart-cross">
            <h3 className="cart-cross-title">También te puede gustar</h3>
            <div className="cart-cross-grid">
              {products
                .filter((p) => !items.some((i) => i.id === p.id))
                .filter((p) => items.some((i) => i.category === p.category))
                .slice(0, 4)
                .map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
