/**
 * CartIcon.jsx - Icono del carrito en el Header
 *
 * Muestra un icono de carrito con el contador de productos.
 * Al hacer clic navega a la página del carrito.
 */

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      to="/carrito"
      className="cart-icon-link"
      aria-label={`Carrito de compras, ${totalItems} productos`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        textDecoration: 'none',
        color: 'var(--text)',
        transition: 'all 0.2s ease',
        marginLeft: '8px',
      }}
    >
      {/* Icono SVG de carrito */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      {/* Contador de productos (solo si hay) */}
      {totalItems > 0 && (
        <span
          className="cart-badge"
          style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            background: 'var(--accent)',
            color: 'white',
            fontSize: '0.7rem',
            fontWeight: 700,
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'badgePop 0.3s ease',
          }}
        >
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
}
