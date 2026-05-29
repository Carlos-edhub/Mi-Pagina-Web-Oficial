/**
 * Hero.jsx - Hero principal con animaciones avanzadas
 *
 * Incluye: gradiente animado, partículas flotantes,
 * texto con aparición escalonada, imagen con anillos expansivos
 * e indicador de scroll.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Variantes para animación escalonada del texto
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } },
};

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Efecto 3D tilt que sigue al mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById('hero-media')?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleWords = ['Perfumes', 'que', 'enamoran'];

  return (
    <section className="hero" role="banner">
      {/* Partículas flotantes */}
      <div className="hero-particles" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="hero-particle"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: `${4 + (i % 3) * 4}px`,
              height: `${4 + (i % 3) * 4}px`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="container hero-inner">
        {/* Columna de texto */}
        <motion.div
          className="hero-copy"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
                    <motion.div className="hero-badge" variants={fadeUp}>
            <span className="hero-badge-dot" />
            Nuevas fragancias 2025
          </motion.div>

          <motion.h1 variants={containerVariants}>
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                style={{ display: 'inline-block', marginRight: '0.35em' }}
              >
                {i === 2 ? <span className="hero-highlight">{word}</span> : word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={fadeUp}>
            Fragancias originales Lattafa, Armaf y más, con envío rápido y asesoría personal por WhatsApp.
          </motion.p>

          <motion.div className="hero-cta" variants={fadeUp}>
            <Link to="/tienda" className="btn btn-primary btn-hero" aria-label="Explorar nuestra tienda de perfumes">
              Explorar tienda
            </Link>
            <Link to="/nosotros" className="btn btn-outline btn-hero" aria-label="Conocer más sobre tng_shops">
              Conócenos
            </Link>
          </motion.div>
                    <motion.div className="hero-social" variants={fadeUp}>
            <div className="hero-avatars">
              <div className="hero-avatar" style={{backgroundImage: 'url(https://i.pravatar.cc/32?img=1)'}} />
              <div className="hero-avatar" style={{backgroundImage: 'url(https://i.pravatar.cc/32?img=5)'}} />
              <div className="hero-avatar" style={{backgroundImage: 'url(https://i.pravatar.cc/32?img=8)'}} />
              <div className="hero-avatar" style={{backgroundImage: 'url(https://i.pravatar.cc/32?img=11)'}} />
              <div className="hero-avatar hero-avatar--more">+</div>
            </div>
            <div className="hero-stars">
              <span className="hero-stars-icons">★★★★★</span>
              <span className="hero-stars-text">4.8/5 · 200+ reseñas</span>
            </div>
          </motion.div>

        </motion.div>

        {/* Columna de imagen con anillos */}
        <div className="hero-media" id="hero-media" role="img" aria-label="Colección de perfumes originales tng_shops">
          {/* Anillos expansivos */}
          <div className="hero-rings" aria-hidden="true">
            <div className="hero-ring" />
            <div className="hero-ring hero-ring--slow" />
            <div className="hero-ring hero-ring--slowest" />
          </div>

          {/* Gradiente pulsante dual */}
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-glow hero-glow--alt" aria-hidden="true" />

          {/* Imagen con efecto 3D parallax al mouse */}
          <motion.div
            className="hero-image-wrapper"
            animate={{
              rotateX: mousePos.y,
              rotateY: mousePos.x,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          >
            <div className="hero-image-glass" />
            <img
              src="/images/bannerTng_shops.png"
              alt="Colección de perfumes originales tng_shops"
              className="banner-img"
            />
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line">
          <motion.div
            className="scroll-dot"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}

