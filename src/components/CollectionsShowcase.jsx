import { Link } from 'react-router-dom'
import collections from '../data/collections'
import products from '../data/products'

const ICONS = {
  'best-sellers': '🏆',
  under25: '💎',
  nuevos: '✨',
  ofertas: '🔥',
  unisex: '♾️',
  lattafa: '🌙',
  armaf: '⚡',
}

export default function CollectionsShowcase() {
  return (
    <section className="collections-showcase" aria-labelledby="collections-title">
      <div className="container">
        <header className="featured-head">
          <div>
            <h2 id="collections-title"><span>C</span>olecciones</h2>
            <p>Encuentra tu fragancia ideal</p>
          </div>
          <Link to="/tienda" className="btn btn-outline btn-sm">Ver todo</Link>
        </header>
        <div className="collections-grid">
          {collections.map((col) => {
            const count = products.filter(col.filter).length
            return (
              <Link
                key={col.id}
                to={`/tienda?coleccion=${col.id}`}
                className="collection-card"
              >
                <span className="collection-icon">{ICONS[col.id] || '📦'}</span>
                <div>
                  <h3 className="collection-name">{col.name}</h3>
                  <p className="collection-desc">{col.description}</p>
                  <span className="collection-count">{count} productos</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
