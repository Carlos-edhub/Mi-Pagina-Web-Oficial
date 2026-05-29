const brands = [
  { name: 'Lattafa', color: '#f59e0b' },
  { name: 'Club de Nuit', color: '#3b82f6' },
  { name: 'Armaf', color: '#f59e0b' },
  { name: 'Swiss Arabian', color: '#10b981' },
  { name: 'Rasasi', color: '#8b5cf6' },
  { name: 'Ajmal', color: '#ec4899' },
]

export default function BrandsSection() {
  return (
    <section className="brands-section">
      <div className="container">
        <h2 className="brands-title"><span>M</span>arcas destacadas</h2>
        <div className="brands-track">
          <div className="brands-scroll">
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="brands-item" style={{ '--brand-color': b.color }}>
                {b.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
