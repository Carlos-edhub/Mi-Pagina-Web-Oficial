import { useParams, Link } from 'react-router-dom'
import blogPosts from '../data/blog'
import products from '../data/products'

const CATEGORY_COLORS = {
  Consejos: '#3b82f6',
  Recomendaciones: '#ec4899',
  Guías: '#a855f7',
  Cultura: '#f59e0b',
  Reseñas: '#22c55e',
}

function RatingBar({ label, value }) {
  return (
    <div className="rating-bar">
      <span className="rating-label">{label}</span>
      <div className="rating-track">
        <div className="rating-fill" style={{ width: `${(value / 10) * 100}%` }} />
      </div>
      <span className="rating-value">{value}/10</span>
    </div>
  )
}

export default function BlogArticlePage() {
  const { id } = useParams()
  const post = blogPosts.find((p) => p.id === Number(id))
  const product = post?.productId ? products.find((p) => p.id === post.productId) : null

  if (!post) {
    return (
      <main id="main-content" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <h1>Artículo no encontrado</h1>
        <p style={{ color: 'var(--text-secondary)' }}>El artículo que buscas no existe o ha sido eliminado.</p>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
          Volver al blog
        </Link>
      </main>
    )
  }

  const color = CATEGORY_COLORS[post.category] || 'var(--text-secondary)'

  return (
    <main id="main-content">
      <article className="blog-article">
        <div className="container" style={{ maxWidth: 720, padding: '3rem 1.5rem' }}>
          <Link to="/blog" className="blog-article-back">← Volver al blog</Link>

          <span className="blog-card-category" style={{ color, marginBottom: '0.75rem', display: 'inline-block' }}>
            {post.category}
          </span>
          <h1 className="blog-article-title">{post.title}</h1>

          <div className="blog-article-meta">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
            <span>{post.author}</span>
          </div>

          {post.rating && (
            <div className="review-rating-card">
              <div className="review-rating-main">
                <span className="review-rating-big">{post.rating.general}</span>
                <span className="review-rating-label">Puntuación general</span>
              </div>
              <div className="review-rating-bars">
                <RatingBar label="Aroma" value={post.rating.scent} />
                <RatingBar label="Longevidad" value={post.rating.longevity} />
                <RatingBar label="Estela" value={post.rating.sillage} />
                <RatingBar label="Calidad-precio" value={post.rating.value} />
              </div>
            </div>
          )}

          {product && (
            <Link to={`/producto/${product.id}`} className="review-product-link">
              <div className="review-product-card">
                <img src={product.image} alt={product.name} />
                <div>
                  <span className="review-product-badge">Producto analizado</span>
                  <strong className="review-product-name">{product.name}</strong>
                  <span className="review-product-price">{product.price.toFixed(2)}€</span>
                </div>
                <span className="review-product-arrow">→</span>
              </div>
            </Link>
          )}

          <div className="blog-article-content">
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>
              if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>
              if (line.startsWith('- **')) {
                const match = line.match(/- \*\*(.+?)\*\*: (.+)/)
                if (match) return <p key={i}><strong>{match[1]}</strong>: {match[2]}</p>
              }
              if (line.startsWith('- ')) return <li key={i}>{line.replace('- ', '')}</li>
              if (line.trim() === '') return null
              if (/^\d+\./.test(line)) return <li key={i} style={{ listStyle: 'decimal', marginLeft: '1.25rem' }}>{line.replace(/^\d+\.\s*/, '')}</li>
              return <p key={i}>{line}</p>
            })}
          </div>

          <div className="blog-article-footer">
            <p>¿Te ha gustado este artículo? Compártelo o descubre más en nuestra <Link to="/tienda">tienda</Link>.</p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/blog" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                Más artículos
              </Link>
              {product && (
                <Link to={`/producto/${product.id}`} className="btn btn-outline" style={{ display: 'inline-flex' }}>
                  Ver {product.name}
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
