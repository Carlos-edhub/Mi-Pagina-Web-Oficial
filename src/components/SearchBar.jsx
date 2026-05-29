import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import products from '../data/products'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  const results = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.notes?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/tienda?search=${encodeURIComponent(query.trim())}`)
      setOpen(false)
      setQuery('')
    }
  }

  return (
    <div ref={ref} className="search-bar">
      <form onSubmit={handleSubmit} role="search">
        <input
          type="search"
          placeholder="Buscar perfumes..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => query.trim() && setOpen(true)}
          className="search-bar-input"
          aria-label="Buscar perfumes"
        />
      </form>

      {open && results.length > 0 && (
        <div className="search-results-dropdown">
          {results.map((p) => (
            <Link
              key={p.id}
              to={`/producto/${p.id}`}
              className="search-result-item"
              onClick={() => { setOpen(false); setQuery('') }}
            >
              <div className="search-result-info">
                <span className="search-result-name">{p.name}</span>
                <span className="search-result-cat">{p.category}</span>
              </div>
              <span className="search-result-price">{p.price.toFixed(2)}€</span>
            </Link>
          ))}
          <Link
            to={`/tienda?search=${encodeURIComponent(query)}`}
            className="search-result-all"
            onClick={() => { setOpen(false); setQuery('') }}
          >
            Ver todos los resultados →
          </Link>
        </div>
      )}
    </div>
  )
}
