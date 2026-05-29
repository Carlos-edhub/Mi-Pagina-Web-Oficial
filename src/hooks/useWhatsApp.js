/**
 * useWhatsApp.js - Hook personalizado para integración con WhatsApp
 * 
 * Proporciona funciones para abrir WhatsApp con mensajes predefinidos,
 * tanto para pedidos como para asesoría general.
 */

// Número de teléfono de la tienda (con código de país, sin +)
const PHONE = '34663079312';

/**
 * Hook useWhatsApp
 * Expone funciones relacionadas con WhatsApp
 */
export function useWhatsApp() {
  /**
   * Crea la URL de WhatsApp con un mensaje codificado
   * @param {string} message - Mensaje a enviar
   * @returns {string} URL completa de WhatsApp
   */
  const createUrl = (message) => {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${PHONE}?text=${encoded}`;
  };

  /**
   * Abre WhatsApp para realizar un pedido de un producto
   * @param {string} productName - Nombre del producto a comprar
   */
  const orderProduct = (productName) => {
    const message = `Hola, quiero comprar *${productName}* desde la web tng_shops. ¿Disponible?`;
    const url = createUrl(message);
    window.open(url, '_blank', 'width=600,height=600');
  };

  /**
   * Abre WhatsApp para asesoría general
   */
  const openConsulting = () => {
    const message = 'Hola, vengo de la web tng_shops y quiero asesoría';
    const url = createUrl(message);
    window.open(url, '_blank', 'width=600,height=600');
  };

  return { orderProduct, openConsulting };
}
