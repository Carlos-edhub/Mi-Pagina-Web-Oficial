/**
 * Contact.jsx - Sección de contacto
 * 
 * Muestra información de contacto: WhatsApp y correo electrónico.
 * El botón de WhatsApp abre directamente la conversación.
 */

import { useWhatsApp } from '../hooks/useWhatsApp';

export default function Contact() {
  const { openConsulting } = useWhatsApp();

  return (
    <section id="contacto" className="contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <h2 id="contact-title">¿Hablamos?</h2>
        <p>Resolvemos dudas, recomendamos perfumes y tomamos pedidos por WhatsApp.</p>

        <div className="cta-row">
          {/* Botón de WhatsApp */}
          <button
            className="btn btn-whatsapp"
            onClick={openConsulting}
            aria-label="Contactar por WhatsApp"
          >
            WhatsApp
          </button>

          {/* Enlace de correo electrónico */}
          <a
            className="btn btn-outline"
            href="mailto:carloscardenas.pv@gmail.com"
            aria-label="Enviar correo a carloscardenas.pv@gmail.com"
          >
            carloscardenas.pv@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
