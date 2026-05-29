/**
 * ToastContext.jsx - Sistema de notificaciones toast
 *
 * Muestra mensajes temporales en la esquina superior derecha.
 * Útil para feedback: "Producto añadido al carrito", etc.
 */

import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  /**
   * addToast - Añade una notificación temporal
   * @param {string} message - Texto del mensaje
   * @param {'success'|'error'|'info'} type - Tipo de notificación
   * @param {number} duration - Duración en ms (default 3000)
   */
  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-eliminar después de la duración
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  /**
   * removeToast - Elimina una notificación manualmente
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Contenedor de toasts - fixed en la esquina superior derecha */}
      <div
        style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9rem',
               boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
               border: '1px solid rgba(255,255,255,0.06)',
              background:
                toast.type === 'success'
                  ? '#1a1a2e'
                  : toast.type === 'error'
                  ? '#1a1a2e'
                  : '#1a1a2e',
              color: toast.type === 'success' ? '#25d366' : toast.type === 'error' ? '#ef4444' : '#f1f1f3',
              animation: 'slideIn 0.3s ease',
              cursor: 'pointer',
              maxWidth: '360px',
            }}
            onClick={() => removeToast(toast.id)}
          >
            {toast.type === 'success' && '✓ '}
            {toast.type === 'error' && '✕ '}
            {toast.type === 'info' && 'ℹ '}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * useToast - Hook para lanzar notificaciones desde cualquier componente
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider');
  return ctx;
}
