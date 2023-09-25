/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./CartProvider";
import { isLoggedIn } from '../Helpers/authHelpers'; // Import your authentication function

function ViewCart({ BASE_URL, token }) {
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { removeFromCart } = useContext(CartContext); 

  useEffect(() => {
    if (!isLoggedIn()) {
      // If the user is not logged in, set an error message
      setErrorMessage("You must be logged in to view the cart");
      return;
    }

    // Function to fetch cart items from the backend
    async function fetchCartItems() {
      // const BASE_URL = "http://localhost:4000/api";
      try {
        const response = await fetch(`${BASE_URL}/cart/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
        } else {
          console.error("Failed to fetch cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    }

    // Call the fetchCartItems function when the component mounts
    fetchCartItems();
  }, []);

  // Remove item from the cart
  const handleRemoveFromCart = (cartItemId) => {
    // Call removeFromCart function from CartContext here
    removeFromCart(cartItemId);
  };

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div>
              <h3>{item.product_name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
            </div>
          </li>
        ))}
      </ul>
      <button>Checkout</button>
    </div>
  );
}

export default ViewCart;