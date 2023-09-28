/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useContext } from "react";
import "../CSS-Components/Products.css";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "./CartProvider"; // Import your CartContext

function AllProducts({ BASE_URL, token, user }) {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { addToCart, setCart } = useContext(CartContext);

  // Fetch products when the component mounts
  useEffect(() => {
    async function fetchProducts() {
      try {
        const headers = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}/products`, {
          headers,
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error while fetching products", error);
      }
    }

    fetchProducts();
  }, [BASE_URL, token]);

  // Function to handle adding items to the cart
  // Function to handle adding items to the cart
  const handleAddToCart = async (productId) => {
    if (!token) {
      localStorage.setItem(
        "logboxMessage",
        "You must be logged in to add an item to your cart."
      );
      navigate("/login");
      return;
    }
  
    try {
      console.log(token);
      console.log(user);
  
      // Check if the user object is valid
      if (!user || !user.id) {
        // Handle the case when the user is not properly authenticated
        console.error("User is not properly authenticated.");
        return;
      }
  
      addToCart( productId, 1);
  
      const response = await fetch(`${BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id, productId, quantity: 1 }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setCart((prevCart) => [...prevCart, data]);
      } else {
        const { message } = await response.json();
        console.error(message);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  return (
    <div>
      <h1>All Products</h1>
      {errorMessage ? (
        <div className="error-message">
          <p>{errorMessage}</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      ) : (
        <div className="product-container">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.product_image} // Assuming product image is stored in product_image
                alt={product.name} // Assuming name is the product name
                className="product-image"
              />
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.item_price}</p>
              </div>
              <div className="add-item-cart">
                <button onClick={() => handleAddToCart(product.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllProducts;