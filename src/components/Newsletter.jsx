import { useState } from 'react'

export default function Newsletter({ variant = 'section' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <div className={`newsletter newsletter-${variant}`}>
      <div className="container">
        <h2 className="newsletter-title">¿Quieres estar al día?</h2>
        <p className="newsletter-desc">
          Recibe novedades, ofertas exclusivas y recomendaciones directamente en tu correo.
        </p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Correo electrónico"
          />
          <button type="submit" className="btn btn-primary newsletter-btn">
            {status === 'success' ? '✓ Suscrito' : 'Suscribirme'}
          </button>
        </form>
        {status === 'success' && (
          <p className="newsletter-success">¡Gracias! Te mantendremos al tanto de todo.</p>
        )}
      </div>
    </div>
  )
}
