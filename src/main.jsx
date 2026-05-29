/**
 * main.jsx - Punto de entrada de la aplicación React
 * 
 * Renderiza el componente App dentro del elemento #root
 * e importa los estilos globales de index.css
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
