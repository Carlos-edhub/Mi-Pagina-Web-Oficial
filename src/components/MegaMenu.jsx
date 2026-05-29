import { useState, useRef, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products'

const categoryMeta = {
  Hombre: { color: '#3b82f6', slug: 'hombre' },
  Mujer: { color: '#ec4899', slug: 'mujer' },
  Unisex: { color: '#a855f7', slug: 'unisex' },
}

export default function MegaMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const timer = useRef(null)

  const grouped = useMemo(() => {
    const map = {}
    products.forEach((p) => {
      if (!map[p.category]) map[p.category] = []
      map[p.category].push(p)
    })
    return map
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleEnter = () => {
    clearTimeout(timer.current)
    setOpen(true)
  }

  const handleLeave = () => {
    timer.current = setTimeout(() => setOpen(false), 200)
  }

  return (
    <div ref={ref} className="mega-trigger" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <span className={`nav-link mega-trigger-label ${open ? 'active' : ''}`}>
        Categorías
      </span>

      {open && (
        <>
          <div className="mega-backdrop" onClick={() => setOpen(false)} />
          <div className="mega-menu" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <div className="mega-menu-inner">
              {Object.entries(grouped).map(([category, catProducts]) => {
                const meta = categoryMeta[category] || { color: 'var(--text-secondary)', slug: category?.toLowerCase() }
                return (
                  <div key={category} className="mega-column">
                    <Link to={`/categoria/${meta.slug}`} className="mega-column-title"
                      style={{ '--cat-color': meta.color }} onClick={() => setOpen(false)}>
                      {category}
                    </Link>
                    <div className="mega-items">
                      {catProducts.map((p) => (
                        <Link key={p.id} to={`/producto/${p.id}`} className="mega-item" onClick={() => setOpen(false)}>
                          <span className="mega-item-name">{p.name}</span>
                          <span className="mega-item-price">{p.price.toFixed(2)}€</span>
                        </Link>
                      ))}
                    </div>
                    <Link to={`/categoria/${meta.slug}`} className="mega-view-all" onClick={() => setOpen(false)}>
                      Ver todo
                    </Link>
                  </div>
                )
              })}

              <div className="mega-column mega-featured">
                <span className="mega-column-title" style={{ '--cat-color': 'var(--accent)' }}>
                  Novedades
                </span>
                <div className="mega-items">
                  <p className="mega-muted">Descubre nuestros últimos lanzamientos</p>
                </div>
                <Link to="/tienda" className="mega-view-all" onClick={() => setOpen(false)}>
                  Todos los productos
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
