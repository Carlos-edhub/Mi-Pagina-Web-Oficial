import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const messages = [
  '🚚 Envío gratis desde 30€',
  '🎁 2 muestras gratis con cada pedido',
  '🏷️ Código: BIENVENIDO10 — 10% off',
]

export default function PromotionalBar() {
  const [index, setIndex] = useState(0)
  const [hidden, setHidden] = useState(false)

  const next = useCallback(() => setIndex((i) => (i + 1) % messages.length), [])

  useEffect(() => {
    if (hidden) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [hidden, next])

  if (hidden) return null

  return (
    <div className="promo-bar">
      <div className="container promo-bar-inner">
        <span className="promo-bar-text" key={index}>{messages[index]}</span>
        <div className="promo-bar-actions">
          <Link to="/servicios" className="promo-bar-link">Servicios</Link>
          <Link to="/fidelidad" className="promo-bar-link">Fidelidad</Link>
          <button className="promo-bar-close" onClick={() => setHidden(true)} aria-label="Cerrar">✕</button>
        </div>
      </div>
    </div>
  )
}
