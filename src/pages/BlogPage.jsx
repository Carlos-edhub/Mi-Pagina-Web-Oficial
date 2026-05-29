import { useState } from 'react'
import { Link } from 'react-router-dom'
import blogPosts from '../data/blog'

const CATEGORIES = ['Todas', ...new Set(blogPosts.map((p) => p.category))]
const CATEGORY_COLORS = {
  Consejos: '#3b82f6',
  Recomendaciones: '#ec4899',
  Guías: '#a855f7',
  Cultura: '#f59e0b',
}

export default function BlogPage() {
  const [filter, setFilter] = useState('Todas')

  const filtered = filter === 'Todas' ? blogPosts : blogPosts.filter((p) => p.category === filter)

  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h1>Blog</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0.5rem auto 0' }}>
            Consejos, guías y recomendaciones sobre el mundo de las fragancias
          </p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <div className="blog-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`blog-filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {filtered.map((post) => {
              const color = CATEGORY_COLORS[post.category] || 'var(--text-secondary)'
              return (
                <article key={post.id} className="blog-card">
                  <div className="blog-card-image">
                    <span className="blog-card-icon">📖</span>
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-card-category" style={{ color }}>
                      {post.category}
                    </span>
                    <h2 className="blog-card-title">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-meta">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} className="blog-card-link">
                      Leer artículo →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>
              No hay artículos en esta categoría todavía.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
