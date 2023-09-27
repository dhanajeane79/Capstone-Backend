

import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Use an object to store cart items, where keys are product IDs
  const [cartItems, setCartItems] = useState({});
  const [cart, setCart] = useState([]); 

  // Add item to the cart or update quantity if it already exists
  const addToCart = (productId, quantity = 1) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      if (updatedCartItems[productId]) {
        updatedCartItems[productId].quantity += quantity;
      } else {
        updatedCartItems[productId] = { productId, quantity };
      }
      return updatedCartItems;
    });
  };

  // Remove item from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      delete updatedCartItems[productId];
      return updatedCartItems;
    });
  };

  // Get an array of cart items from the object
  const getCartItemsArray = () => {
    return Object.values(cartItems);
  };

  // Include setCartItems in CartContext Provider value
  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

 
 export default CartProvider;





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
