/**
 * Badges.jsx - Barra de ventajas o características
 *
 * Muestra las ventajas clave de comprar en tng_shops.
 */

const items = [
  { text: '100% originales', accent: '○' },
  { text: 'Envíos a todo el país', accent: '◇' },
  { text: 'Asesoría por WhatsApp', accent: '◎' },
  { text: 'Pago seguro', accent: '□' },
];

export default function Badges() {
  return (
    <section className="badges" aria-label="Ventajas de tng_shops">
      <div className="container badges-grid" role="list">
        {items.map((item, index) => (
          <div key={index} className="badge" role="listitem">
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}
