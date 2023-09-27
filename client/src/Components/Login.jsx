// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../CSS-Components/Login-Form.css";
// import { fetchWithHeaders, makeHeaders } from "../Helpers/api";

// function Login({ BASE_URL, handleLoginSuccess, token, user, setUser }) {
//   // Define component state
//   const [email, setEmail] = useState(""); // State for user email
//   const [password, setPassword] = useState(""); // State for user password
//   const [errorMessage, setErrorMessage] = useState(""); // State for login error message
//   const [logboxMessage, setLogboxMessage] = useState(""); // State for a message from logbox
//   const navigate = useNavigate(); // Function for programmatic navigation

//   // Use useEffect to check and display any logbox messages
//   useEffect(() => {
//     const message = localStorage.getItem("logboxMessage");
//     if (message) {
//       setLogboxMessage(message);
//       localStorage.removeItem("logboxMessage");
//     }
//   }, []);

//   // Function to handle login form submission
//   const handleLoginSubmit = async (event) => {
//     event.preventDefault(); // Prevent the default form submission

//     try {
//       // Send a POST request to the login endpoint with user credentials
//       const response = await fetch(`${BASE_URL}/users/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       if (response.ok) {
//         // If the response is successful:
//         const data = await response.json(); // Parse the response data
//         handleLoginSuccess(data.token); // Call a callback to handle successful login
//         setUser(data.user); // Set the user in the application state
//         localStorage.setItem("authToken", data.token); // Store the auth token in local storage
//         navigate("/products"); // Redirect the user to the products page
//       } else {
//         // If the response is not successful, display an error message
//         setErrorMessage("Incorrect email or password");
//       }
//     } catch (error) {
//       // If an error occurs during login, display a generic error message
//       setErrorMessage("An error occurred during login");
//     }
//   };

//   // Function to handle input field changes (email and password)
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     if (name === "email") {
//       setEmail(value); // Update the email state
//     } else if (name === "password") {
//       setPassword(value); // Update the password state
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {/* Display logbox message if it exists */}
//       {logboxMessage && <p className="logbox-message">{logboxMessage}</p>}
//       <form className="login-form" onSubmit={handleLoginSubmit}>
//         <div>
//           <label htmlFor="loginEmail">Email</label>
//           <input
//             type="email"
//             id="loginEmail"
//             name="email"
//             value={email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="loginPassword">Password</label>
//           <input
//             type="password"
//             id="loginPassword"
//             name="password"
//             value={password}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;






















/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import Button from "react-bootstrap/Button";
// eslint-disable-next-line no-unused-vars
import Form from "react-bootstrap/Form";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS-Components/Login-Form.css";
import { fetchWithHeaders, makeHeaders } from "../Helpers/api";

function Login({ BASE_URL, handleLoginSuccess, token, user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [logboxMessage, setLogboxMessage] = useState(""); // New state for the logbox message.
  const navigate = useNavigate();

  // New useEffect hook to fetch and clear the logbox message.
  useEffect(() => {
    const message = localStorage.getItem("logboxMessage");
    if (message) {
      setLogboxMessage(message);
      localStorage.removeItem("logboxMessage");
    }
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json(); // Parse the response data
        console.log("data:", data); // Log the parsed response data
        handleLoginSuccess(data.token); // Assuming the token is directly in the response
        setUser(data.user);
        localStorage.setItem("authToken", data.token);
        navigate("/products");
      } else {
        setErrorMessage("Incorrect email or password");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {/* New section to display the logbox message if it exists. */}
      {logboxMessage && <p className="logbox-message">{logboxMessage}</p>}
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="loginEmail">Email</label>
          <input
            type="email"
            id="loginEmail"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            id="loginPassword"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;