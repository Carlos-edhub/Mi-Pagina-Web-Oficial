import { useParams, Link } from 'react-router-dom'
import blogPosts from '../data/blog'

export default function BlogArticlePage() {
  const { id } = useParams()
  const post = blogPosts.find((p) => p.id === Number(id))

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

  return (
    <main id="main-content">
      <article className="blog-article">
        <div className="container" style={{ maxWidth: 720, padding: '3rem 1.5rem' }}>
          <Link to="/blog" className="blog-article-back">← Volver al blog</Link>

          <h1 className="blog-article-title">{post.title}</h1>

          <div className="blog-article-meta">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
            <span>{post.category}</span>
          </div>

          <div className="blog-article-image">
            <span style={{ fontSize: '3rem' }}>📖</span>
          </div>

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
            <Link to="/blog" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              Más artículos
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
