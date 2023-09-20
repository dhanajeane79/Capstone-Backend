/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

function ViewCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
   
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });

    // Example: Fetch cart items from localStorage
    // const storedCartItems = JSON.parse(localStorage.getItem("cart"));
    // setCartItems(storedCartItems || []);
  }, []);

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div>
              <h3>{item.product_name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
      <button>Checkout</button>
    </div>
  );
}

export default ViewCart;