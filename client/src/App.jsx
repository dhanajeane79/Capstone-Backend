/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import "./index.css";
import NavBar from "./Components/NavBar";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import AllProducts from "./Components/AllProducts";
import RegistrationForm from "./Components/RegistrationForm";
import Login from "./Components/Login";
import AboutUs from "./Components/AboutUs"
import OrderStatus from "./Components/OrderStatus"
import ContactUs from "./Components/ContactUs"
import ViewCart from "./Components/ViewCart";




function App() {
  const BASE_URL = 'https://api.escuelajs.co/api/v1';
  const storedToken = localStorage.getItem("authToken"); // Check if there is a token in localStorage
  const [token, setToken] = useState(storedToken || ""); // Set initial value to storedToken

  // State to store the authentication token
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken"); // Check if there's a token in sessionStorage
   if (authToken) {
   setToken(authToken); // Set the token in state
    }
  }, []);

  // Function to handle successful login and set token
  const handleLoginSuccess = (newToken) => {
    localStorage.setItem("authToken", newToken); // Store the token in localStorage
    setToken(newToken); // Set the token in state
  };

  // Function to handle logout and clear token
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
    setToken("");  // Clear the token from state
  };


  return (
    <Router>
      <div className="app">

      <NavBar isLoggedIn={Boolean(token)} logout={handleLogout} /> 
      
        <Routes>
          <Route path="/" element={<Layout> <Home /> </Layout>}/>
          <Route path="/about" element={<Layout> <AboutUs /> </Layout>}/>
          <Route path="/order-status" element={<Layout> <OrderStatus /> </Layout>}/>
          <Route path="/contact" element={<Layout> <ContactUs /> </Layout>}/>
          <Route path="/products" element={<Layout> <AllProducts BASE_URL={BASE_URL} token={token} /></Layout>}/>
          <Route path="/cart" element={<Layout> <ViewCart BASE_URL={BASE_URL} token={token} /></Layout>}/>
          <Route path="/register" element={<Layout> <RegistrationForm BASE_URL={BASE_URL} /></Layout>}/>
          <Route path="/login" element={<Layout> <Login BASE_URL={BASE_URL} handleLoginSuccess={handleLoginSuccess} /></Layout>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;