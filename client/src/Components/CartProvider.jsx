// import React, { createContext, useContext, useState } from 'react';

// // Create a context for your cart
// export const CartContext = createContext();

// // Create the CartProvider component
// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);

//   // Function to add an item to the cart
//   const addToCart = (item) => {
//     setCartItems([...cartItems, item]);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartProvider;
 // Default export at the bottom


 import React, { createContext, useState } from 'react';

 export const CartContext = createContext();
 
 export function CartProvider({ children }) {
   const [cartItems, setCartItems] = useState([]);
 
   const addToCart = (item) => {
     setCartItems([...cartItems, item]);
   };
 
   const removeFromCart = (id) => {
     setCartItems(cartItems.filter((item) => item.id !== id));
   };
 
   // Include setCartItems in CartContext Provider value
   return (
     <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart }}>
       {children}
     </CartContext.Provider>
   );
 }
 
 export default CartProvider;