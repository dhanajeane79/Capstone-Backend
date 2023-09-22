/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function RegistrationForm({ BASE_URL }) {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   address: "",
  //   address2: "",
  //   city: "",
  //   state: "",
  //   zip: "",
  //   isChecked: false,
  // });

  // const [errorMessage, setErrorMessage] = useState("");
  // const [registrationSuccess, setRegistrationSuccess] = useState(false);
  // const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  // const handleInputChange = (event) => {
  //   const { name, value, type, checked } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  // Function to Handle successful registration
  // const handleRegistrationSuccess = (token) => {
  //   setRegistrationSuccess(true); // Set registration success state to true
  //   setEmail("");
  //   setPassword("");
  //   setConfirmPassword("");
  // };

  // const handleRegistrationSuccess = token => {
  //   console.log("Registration successful!");
  //   setRegistrationSuccess(true);
  //   setUsername('');
  //   setPassword('');
  //   setConfirmPassword('');

  // };

  const handleRegistrationSuccess = (token) => {
    setRegistrationSuccess(true); // Set registration success state to true
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
  };

  // Function to handle form submission
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   // if (formData.password !== formData.confirmPassword) {
  //     if (password !== confirmPassword) {
  //     setErrorMessage("Passwords don't match");
  //     return;
  //   }
  //   try {
  //     const response = await fetch(`${BASE_URL}/users/register`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: formData.email,
  //         password: formData.password,
  //       }),
  //     });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username,
            email,
            password,
          },
        }),
      });
  
      if (response.status === 200) {
        // Check for success message in the response
        const responseData = await response.json();
        if (responseData.message === "you're signed up!") {
          // Registration was successful
          handleRegistrationSuccess(responseData.token);
        } else {
          // Some other success message, handle accordingly
          setErrorMessage("Registration failed");
        }
      } else {
        // Registration failed, handle the error message
        const responseData = await response.json();
        setErrorMessage(responseData.error || "Registration failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration");
    }
  };
  // const usStates = [
  //   "Alabama",
  //   "Alaska",
  //   "Arizona",
  //   "Arkansas",
  //   "California",
  //   "Colorado",
  //   "Connecticut",
  //   "Delaware",
  //   "Florida",
  //   "Georgia",
  //   "Hawaii",
  //   "Idaho",
  //   "Illinois",
  //   "Indiana",
  //   "Iowa",
  //   "Kansas",
  //   "Kentucky",
  //   "Louisiana",
  //   "Maine",
  //   "Maryland",
  //   "Massachusetts",
  //   "Michigan",
  //   "Minnesota",
  //   "Mississippi",
  //   "Missouri",
  //   "Montana",
  //   "Nebraska",
  //   "Nevada",
  //   "New Hampshire",
  //   "New Jersey",
  //   "New Mexico",
  //   "New York",
  //   "North Carolina",
  //   "North Dakota",
  //   "Ohio",
  //   "Oklahoma",
  //   "Oregon",
  //   "Pennsylvania",
  //   "Rhode Island",
  //   "South Carolina",
  //   "South Dakota",
  //   "Tennessee",
  //   "Texas",
  //   "Utah",
  //   "Vermont",
  //   "Virginia",
  //   "Washington",
  //   "West Virginia",
  //   "Wisconsin",
  //   "Wyoming",
  // ];

  return (
    <div className="registration-form-container-1">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {!registrationSuccess ? (
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formGridUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                // value={formData.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                // value={formData.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                minLength={4}
                required
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                // value={formData.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
                placeholder="Password"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                // value={formData.confirmPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                required
                placeholder="Confirm Password"
              />
            </Form.Group>
          </Row>

          {/* <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>
              Address <span className="optional-text">(Optional)</span>
            </Form.Label>
            <Form.Control
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="1234 Main St"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>
              Address 2 <span className="optional-text">(Optional)</span>
            </Form.Label>
            <Form.Control
              name="address2"
              value={formData.address2}
              onChange={handleInputChange}
              placeholder="Apartment, studio, or floor"
            />
          </Form.Group>

          <Row className="mb-3">
          <Form.Group className="mb-3" controlId="formGridCity">
              <Form.Label>
              City <span className="optional-text">(Optional)</span>
                </Form.Label>
              <Form.Control
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridState">
            <Form.Label>
              State <span className="optional-text">(Optional)</span>
            </Form.Label>
            <Form.Select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              >
                <option value="">Choose...</option>
                {usStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridZip">
            <Form.Label>
              Zip <span className="optional-text">(Optional)</span>
            </Form.Label>
            <Form.Control
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              placeholder="Zip"
            />
          </Form.Group>
          </Row>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Check me out"
              name="isChecked"
              checked={formData.isChecked}
              onChange={handleInputChange}
            />
          </Form.Group> */}

          <Button variant="primary" type="submit">
            Register
          </Button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      ) : (
        <div>
          <p className="success-message">
            Registration successful! You can now log in.
          </p>
          <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
