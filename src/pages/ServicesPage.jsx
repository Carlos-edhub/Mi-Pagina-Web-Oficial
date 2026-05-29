import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  {
    icon: '🎴',
    title: 'Tarjeta Regalo',
    desc: 'Regala la mejor fragancia. Elige un importe y lo enviamos al instante por email.',
    features: ['Personalizable con mensaje', 'Entrega inmediata por email', 'Válida para toda la tienda'],
    cta: 'Comprar tarjeta',
    to: '/contacto',
  },
  {
    icon: '📍',
    title: 'Click & Collect',
    desc: 'Compra online y recoge en nuestro punto de recogida sin coste adicional.',
    features: ['Sin gastos de envío', 'Recogida en 24-48h', 'Horario flexible'],
    cta: 'Ver puntos de recogida',
    to: '/contacto',
  },
  {
    icon: '⭐',
    title: 'Programa de Puntos',
    desc: 'Acumula puntos con cada compra y canjéalos por descuentos exclusivos.',
    features: ['1€ = 10 puntos', 'Descuentos desde 500 puntos', 'Acceso anticipado a novedades'],
    cta: 'Más información',
    to: '/fidelidad',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

export default function ServicesPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h1>Servicios</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0.5rem auto 0' }}>
            Todo lo que ofrecemos para que tu experiencia de compra sea única
          </p>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className="service-card"
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                custom={i}
                viewport={{ once: true }}
              >
                <span className="service-icon">{s.icon}</span>
                <h2 className="service-title">{s.title}</h2>
                <p className="service-desc">{s.desc}</p>
                <ul className="service-features">
                  {s.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link to={s.to} className="btn btn-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                  {s.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-faq">
        <div className="container" style={{ padding: '4rem 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Preguntas frecuentes</h2>
          <div className="faq-grid">
            {[
              { q: '¿Cómo funciona el programa de puntos?', a: 'Por cada euro gastado acumulas 10 puntos. Al alcanzar 500 puntos puedes canjearlos por un descuento de 5€ en tu próxima compra.' },
              { q: '¿Cuánto tarda el Click & Collect?', a: 'Una vez recibas el email de confirmación (normalmente 24-48h), puedes pasar a recoger tu pedido presentando el código.' },
              { q: '¿Puedo personalizar la tarjeta regalo?', a: 'Sí, puedes añadir un mensaje personalizado y elegir la fecha de envío.' },
              { q: '¿Los puntos de fidelidad caducan?', a: 'Los puntos tienen una validez de 12 meses desde la fecha de la compra.' },
            ].map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-question">{item.q}</summary>
                <p className="faq-answer">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
