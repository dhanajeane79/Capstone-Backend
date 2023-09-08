/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";


function AllProducts({ BASE_URL, token }) {

  const [products, setProducts] = useState([]);
//   const [user, setUser] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");

  // Fetch products when the component mounts
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${BASE_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the request header
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error while fetching products', error);
      }
    }

    fetchProducts();
  }, [BASE_URL, token]);
 // Function for matching text in searh bar
//  const productMatches = (product, text) => {
//     return (
//       product.title.toLowerCase().includes(text) ||
//       product.description.toLowerCase().includes(text)
//     );
//   };
//   const filteredProducts = products.filter((product) =>
//     productMatches(product, searchTerm.toLowerCase())
//   );
//   const productsToDisplay = searchTerm.length ? filteredProducts : products;

return (
    <div>
      <h1>All Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default AllProducts;

