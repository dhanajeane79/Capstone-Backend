import React, { createContext, useContext, useReducer } from 'react';

// Define your initial cart state or load it from storage
const initialCartState = {
  cartItems: [],
};

// Create a context for your cart
export const CartContext = createContext();

// Define a reducer function to handle cart actions
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Handle adding items to the cart
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    // Add more cases for other cart actions as needed
    default:
      return state;
  }
}

// Create the CartProvider component
export function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider; // Default export at the bottom