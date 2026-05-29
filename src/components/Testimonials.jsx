const testimonials = [
  {
    text: 'Pedido llegó en 48h y el perfume es exactamente lo que buscaba. El aroma dura muchísimo. Repetiré seguro.',
    author: 'Carlos M.',
    rating: 5,
    product: 'Club de Nuit Intense Man',
  },
  {
    text: 'Compré Khamrah por recomendación y es una locura. Todos me preguntan qué perfume llevo. Muy recomendable.',
    author: 'Laura G.',
    rating: 5,
    product: 'Khamrah',
  },
  {
    text: 'Primera vez que compraba aquí y la experiencia fue genial. El envío rápido y el precio imbatible.',
    author: 'Miguel Á.',
    rating: 5,
    product: 'Fakhar Men Black',
  },
  {
    text: 'Me encanta Bright Peach. Es dulce pero no empalagoso. Ideal para el día a día. Volveré a por más.',
    author: 'Ana P.',
    rating: 4,
    product: 'Bright Peach',
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="testimonials-title">Lo que dicen nuestros <span>clientes</span></h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="testimonial-card">
              <div className="testimonial-stars">
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-footer">
                <span className="testimonial-author">{t.author}</span>
                <span className="testimonial-product">{t.product}</span>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
