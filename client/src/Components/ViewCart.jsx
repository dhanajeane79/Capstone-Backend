import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./CartProvider";
import { isLoggedIn } from "../Helpers/authHelpers";
import "../CSS-Components/ViewCart.css"; // Import your CSS file for styling

function ViewCart({ BASE_URL, token }) {
  const { cartItems, setCartItems, removeFromCart } = useContext(CartContext);
  const [itemQuantities, setItemQuantities] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Token:", token);
    
    if (!isLoggedIn()) {
      setErrorMessage("You must be logged in to view the cart");
      setIsLoading(false);
      return;
    }

    async function fetchCartItems() {
      console.log("Token:", token);
      
      try {
        console.log("Fetching cart items with token:", token);

        const response = await fetch(`${BASE_URL}/cart/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched cart items:", data);
          setCartItems(data);
          localStorage.setItem("cartItems", JSON.stringify(data));
        } else {
          console.error("Failed to fetch cart items");
          setErrorMessage("Failed to fetch cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items", error);
        setErrorMessage("An error occurred while fetching cart items");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCartItems();
  }, [BASE_URL, token, setCartItems]);

  const handleRemoveFromCart = (cartItemId) => {
    removeFromCart(cartItemId);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Define a function to handle order placement
  const handlePlaceOrder = (order) => {
    // Implement order placement logic here
    console.log('Order placed:', order);
    // Optionally, you can clear the cart or perform other actions here
  };


  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="items-in-cart">
      <ul className="cart-list">
  {Object.values(cartItems).map((item) => (
    <li key={item.productId} className="cart-item">
              <div className="product-image">
                <img src={item.smallImage} alt={`Product ${item.id}`} />
              </div>
              <div className="product-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.item_price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
        onClick={() => {
          console.log("Item ID:", item.productId);
          handleRemoveFromCart(item.productId);
        }}
        className="remove-button"
      >
        Remove from Cart
      </button>
    </li>
  ))}
</ul>
      </div>
      <button className="checkout-button">Checkout</button>
      <Checkout onPlaceOrder={handlePlaceOrder} />
    </div>
  );
}

export default ViewCart;





/* eslint-disable no-unused-vars */
// import React, { useState, useEffect, useContext } from "react";
// import { CartContext } from "./CartProvider";
// import { isLoggedIn } from '../Helpers/authHelpers'; // Import your authentication function

// // function ViewCart({ BASE_URL, token }) {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const { removeFromCart } = useContext(CartContext);
// //   const [isLoading, setIsLoading] = useState(true); // Define isLoading state

// function ViewCart({ BASE_URL, token }) {
//   function ViewCart({ BASE_URL, token }) {
//     const { cartItems, setCartItems, removeFromCart } = useContext(CartContext);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   }

//   useEffect(() => {

//     if (!isLoggedIn()) {
//       // If the user is not logged in, set an error message
//       setErrorMessage("You must be logged in to view the cart");
//       setIsLoading(false); // Set isLoading to false
//       return;
//     }

//     // Function to fetch cart items from the backend
//     async function fetchCartItems() {
//       // const BASE_URL = "http://localhost:4000/api";
//       try {
//         const response = await fetch(`${BASE_URL}/cart/items`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setCartItems(data);

//           // Store cart items in local storage
//           localStorage.setItem('cartItems', JSON.stringify(data));
//         } else {
//           console.error("Failed to fetch cart items");
//         }
//       } catch (error) {
//         console.error("Error fetching cart items", error);
//       } finally {
//         setIsLoading(false); // Set isLoading to false when done
//       }
//     }

//     // Call the fetchCartItems function when the component mounts
//     fetchCartItems();
//   }, [BASE_URL, token, setCartItems]); // Add BASE_URL and token to the dependency array

//   // Remove item from the cart
//   const handleRemoveFromCart = (cartItemId) => {
//     removeFromCart(cartItemId);
//   };

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h1>Your Shopping Cart</h1>
//       {errorMessage && <p>{errorMessage}</p>}
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.id}>
//             <div>
//               <h3>{item.product_name}</h3>
//               <p>{item.description}</p>
//               <p>Price: ${item.price}</p>
//               <p>Quantity: {item.quantity}</p>
//               <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <button>Checkout</button>
//     </div>
//   );
// }

// export default ViewCart;

// import React, {useState, useEffect, useContext} from "react";
// import {CartContext} from "./CartProvider";
// import {isLoggedIn} from '../Helpers/authHelpers';

// function ViewCart({BASE_URL, token}) {
//   const {cartItems, setCartItems, removeFromCart} = useContext(CartContext);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!isLoggedIn()) {
//       setErrorMessage("You must be logged in to view the cart");
//       setIsLoading(false);
//       return;
//     }

//     async function fetchCartItems() {
//       try {
//         const response = await fetch(`${BASE_URL}/cart/items`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setCartItems(data);
//           localStorage.setItem('cartItems', JSON.stringify(data));
//         } else {
//           console.error("Failed to fetch cart items");
//         }
//       } catch (error) {
//         console.error("Error fetching cart items", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchCartItems();
//   }, [BASE_URL, token, setCartItems]);

//   const handleRemoveFromCart = (cartItemId) => {
//     removeFromCart(cartItemId);
//   };

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div >

//       <h1>Your Shopping Cart</h1>

//       {errorMessage && <p>{errorMessage}</p>}
//       <div className="items-in-cart">
//       <ul>
//   {cartItems.map((item) => (
//     <li key={item.id}>
//       <div>
//         <h3>{item.name}</h3>
//         <p>Price: ${item.item_price}</p>
//         <p>Quantity: {item.quantity}</p>
//         <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
//       </div>
//     </li>
//   ))}
// </ul>
// </div>
//       <button>Checkout</button>
//     </div>
//   );
// }

// export default ViewCart;