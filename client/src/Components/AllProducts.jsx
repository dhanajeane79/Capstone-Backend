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

function AllProducts({ BASE_URL, token }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
  const addToCart = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/db/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1 // You can adjust the quantity as needed
        })
      });

      if (response.ok) {
        console.log("Item added to cart successfully!");
      } else {
        console.error("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (

    
    <div>
      
      <h1>All Products</h1>
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imgUrl} alt={product.product_name} className="product-image" />
            <div className="product-details">
              <h2 className="product-name">{product.product_name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <p className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
              <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default AllProducts;

