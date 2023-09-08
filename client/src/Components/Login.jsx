/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line no-unused-vars
import Form from 'react-bootstrap/Form';
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithHeaders } from "../Helpers/api";
import "../CSS-Components/Login-Form.css"


// function Login({ BASE_URL, handleLoginSuccess }) {
//     const [username, setUsername] = useState("");  // State to store username 
//     const [password, setPassword] = useState(""); // State to store password inputs
//     const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
//     const navigate = useNavigate(); // Hook to navigate to different routes
  
//     // Function to handle login form submission
//     const handleLoginSubmit = async (event) => {
//       event.preventDefault();
//       try {
//         const data = await fetchWithHeaders(`${BASE_URL}/auth/login`, "POST", { 
//           user: {
//             username,
//             password,
//           },
//         });
  
//         if (data.success) {
//           handleLoginSuccess(data.data.token); // Call the handleLoginSuccess function to set the token
//           localStorage.setItem("authToken", data.data.token); // Store the token in localStorage
//           navigate("/products"); // Navigate to the posts page
//         } else {
//           setErrorMessage("Incorrect username or password"); // Display error message for incorrect credentials
//         }
//       } catch (error) {
//         setErrorMessage("An error occurred during login"); // Display error message for any other login errors
//       }
//     };
  
//     return (
       
//         <div >
//              <h3>Sign In</h3>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <Form onSubmit={handleLoginSubmit}>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Username</Form.Label>
//             <Form.Control  
//             type="text"
//             className="loginUsername"
//             placeholder="Enter Username" 
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             />
          
//           </Form.Group>
    
//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control 
//             type="password" 
//             className= "loginPassword"
//             placeholder="Password" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formBasicCheckbox">
//             <Form.Check type="checkbox" label="Keep me signed in" />
//           </Form.Group>
    
//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>
//         </div>
//       );
//     }

/*
    fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            body:JSON.stringify({
                username: username,
                password: password
            })
        })

    fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body:JSON.stringify({
                username: username ,
                password: password
            })
        })


*/
    
  
function Login({ BASE_URL, handleLoginSuccess }) {
  const [email, setEmail] = useState("");  // State to store username 
  const [password, setPassword] = useState(""); // State to store password inputs
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Function to handle login form submission
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });


    // const data = await response.json(); 
   
    if (response.status === 201) { // Check for HTTP status 201 (Created)
      const data = await response.json();
      const accessToken = data.access_token;
      
      console.log(email)
      console.log(password)
      console.log("Login successful");
      console.log(data);

      if (accessToken) {
        
        handleLoginSuccess(accessToken); // Call the handleLoginSuccess function to set the token
        localStorage.setItem("authToken", accessToken); // Store the token in localStorage
        navigate("/products"); // Navigate to the products page
      } else {
        setErrorMessage("Incorrect email or password"); // Display error message for incorrect credentials
      }
    } else {
      setErrorMessage("An error occurred during login"); // Display error message for other login errors
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    setErrorMessage("An error occurred during login"); // Display error message for any other login errors
  }
};
  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="loginUsername">email</label>
          <input
            type="text"
            id="loginUsername"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            id="loginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
