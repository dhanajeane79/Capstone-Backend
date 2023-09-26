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