/**
 * CartContext.jsx - Estado global del carrito de compras
 *
 * Usa Context + useReducer para manejar el carrito.
 * Persiste los datos en localStorage para que sobrevivan al refresco.
 */

import { createContext, useContext, useReducer, useEffect } from 'react';

// --- Creación del Context ---
const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

// --- Acciones disponibles ---
export const CART_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  UPDATE_QTY: 'UPDATE_QTY',
  CLEAR: 'CLEAR',
};

/**
 * reducer - Función pura que maneja las acciones del carrito
 * Recibe el estado actual y una acción, devuelve el nuevo estado
 */
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      // Buscamos si el producto ya está en el carrito
      const existing = state.items.find((item) => item.id === action.product.id);
      if (existing) {
        // Si existe, incrementamos la cantidad
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      // Si no existe, lo añadimos con cantidad 1
      return {
        ...state,
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }

    case CART_ACTIONS.REMOVE:
      // Eliminamos un producto del carrito por su id
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };

    case CART_ACTIONS.UPDATE_QTY:
      // Actualizamos la cantidad de un producto
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: Math.max(1, action.quantity) }
            : item
        ),
      };

    case CART_ACTIONS.CLEAR:
      // Vaciamos el carrito
      return { ...state, items: [] };

    default:
      return state;
  }
}

/**
 * CartProvider - Proveedor que envuelve la app
 * Inicializa el estado desde localStorage si existe
 */
export function CartProvider({ children }) {
  const savedCart = typeof window !== 'undefined'
    ? localStorage.getItem('tng_cart')
    : null;

  const initialState = {
    items: savedCart ? JSON.parse(savedCart) : [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persistimos el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('tng_cart', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

// --- Hooks personalizados para consumir el contexto ---

/**
 * useCart - Hook para leer el estado del carrito
 * Devuelve { items, totalItems, totalPrice }
 */
export function useCart() {
  const state = useContext(CartContext);
  if (!state) throw new Error('useCart debe usarse dentro de CartProvider');

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return { items: state.items, totalItems, totalPrice };
}

/**
 * useCartDispatch - Hook para obtener la función dispatch
 * Permite enviar acciones al reducer desde cualquier componente
 */
export function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch)
    throw new Error('useCartDispatch debe usarse dentro de CartProvider');
  return dispatch;
}
