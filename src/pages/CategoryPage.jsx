import { useParams, Link } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

const meta = {
  hombre: { name: 'Hombre', desc: 'Fragancias audaces y sofisticadas para el hombre moderno', color: '#3b82f6' },
  mujer: { name: 'Mujer', desc: 'Aromas elegantes y femeninos que dejan huella', color: '#ec4899' },
  unisex: { name: 'Unisex', desc: 'Fragancias versátiles para cualquier persona y ocasión', color: '#a855f7' },
}

export default function CategoryPage() {
  const { slug } = useParams()
  const cat = meta[slug] || { name: 'Categoría', desc: '', color: 'var(--text-secondary)' }
  const filtered = products.filter((p) => p.category?.toLowerCase() === slug?.toLowerCase())

  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
          <Link to="/tienda" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', marginBottom: '0.75rem' }}>
            ← Volver a tienda
          </Link>
          <h1 style={{ color: cat.color }}>{cat.name}</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0.5rem auto 0' }}>{cat.desc}</p>
        </div>
      </section>

      <section className="shop">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="search-results">
              No hay productos en esta categoría todavía.
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} compact />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
