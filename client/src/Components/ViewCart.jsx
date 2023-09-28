import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./CartProvider";
import { isLoggedIn } from "../Helpers/authHelpers";
import { Link } from 'react-router-dom';

import '../CSS-Components/ViewCart.css';
import Checkout from '../Components/Checkout';
import { Container, Row, Col, ListGroup, ListGroupItem, Image, Button } from 'react-bootstrap';

function ViewCart({ BASE_URL, token }) {
  const { cartItems, setCartItems, removeFromCart } = useContext(CartContext);
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
  
  const handlePlaceOrder = (order) => {
    // Implement order placement logic here using the order object
    console.log('Placing the order:', order);
  };
  
  return (
    <Container className="cart-container">
      <Row>
        <Col>
          <h1>Your Shopping Cart</h1>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <ListGroup>
          {Object.values(cartItems).map((item) => (
            <ListGroupItem key={item.productId}>
              <Row className="align-items-center">
                <Col xs={2}>
                  <Image src={item.smallImage} rounded alt={`Product ${item.id}`} />
                </Col>
                <Col xs={6}>
                  <div className="product-details">
                    
                    <h2 className="product-name">{item.name}</h2>
                    <p className="product-description">{item.description}</p>
                    <p className="product-price">`${item.item_price}`</p>
                  </div>
                  
                </Col>
                <Col xs={2}>
                  <p>Quantity: {item.quantity}</p>
                </Col>
                <Col xs={2}>
                  <Button 
                    variant="danger" 
                    onClick={() => {
                      console.log("Item ID:", item.productId);
                      handleRemoveFromCart(item.productId);
                    }}>Remove from Cart</Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
          <div className="checkout-buttons">
            <Link to="/products" className="btn btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkout onPlaceOrder={handlePlaceOrder} />
        </Col>
      </Row>
    </Container>
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