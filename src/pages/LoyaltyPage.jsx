import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const tiers = [
  {
    name: 'Bronce',
    points: '0 — 999',
    color: '#cd7f32',
    benefits: ['1€ = 10 puntos', 'Acceso a ofertas básicas'],
  },
  {
    name: 'Plata',
    points: '1.000 — 4.999',
    color: '#c0c0c0',
    benefits: ['1€ = 12 puntos', 'Envío gratis desde 20€', 'Descuento de cumpleaños'],
  },
  {
    name: 'Oro',
    points: '5.000+',
    color: '#ffd700',
    benefits: ['1€ = 15 puntos', 'Envío gratis sin mínimo', 'Acceso anticipado a novedades', 'Regalo sorpresa cada trimestre'],
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

export default function LoyaltyPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h1>Programa de Puntos</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0.5rem auto 0' }}>
            Cada compra suma. Canjea tus puntos por descuentos y ventajas exclusivas
          </p>
        </div>
      </section>

      <section className="loyalty-how">
        <div className="container" style={{ padding: '0 0 3rem', textAlign: 'center' }}>
          <div className="loyalty-steps">
            {[
              { step: '1', title: 'Compra', desc: 'Cada euro gastado suma puntos automáticamente' },
              { step: '2', title: 'Acumula', desc: 'Revisa tu saldo de puntos en cada pedido' },
              { step: '3', title: 'Canjea', desc: 'Alcanza los mínimos y consigue descuentos' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                className="loyalty-step"
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                custom={i}
                viewport={{ once: true }}
              >
                <span className="loyalty-step-num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="loyalty-tiers">
        <div className="container" style={{ padding: '3rem 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Niveles de fidelidad</h2>
          <div className="loyalty-tiers-grid">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                className="loyalty-tier-card"
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                custom={i}
                viewport={{ once: true }}
                style={{ '--tier-color': tier.color }}
              >
                <div className="loyalty-tier-header">
                  <span className="loyalty-tier-badge">{tier.name}</span>
                  <span className="loyalty-tier-points">{tier.points} pts</span>
                </div>
                <ul className="loyalty-tier-benefits">
                  {tier.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="loyalty-cta">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>¿Listo para empezar a acumular?</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 1.5rem' }}>
            Cada compra te acerca a tu próximo descuento
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/tienda" className="btn btn-primary">Empezar a comprar</Link>
            <Link to="/contacto" className="btn btn-outline">Contactar</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
