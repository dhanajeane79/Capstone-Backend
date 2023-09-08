/* eslint-disable no-unused-vars */
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "../CSS-Components/StyleNavBar.css";
import overlayImage from "../assets/Logo7.png";

function NavBar() {
  return (
    <div className="nav-bar-combo">
      {/* First Navbar (Top Navbar) */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About US
            </Link>
            <Link to="/order-status" className="nav-link">
              Order Status
            </Link>
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Form inline>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </Navbar>

      {/* Second Navbar (Bottom Navbar) */}
      <div className="middle-nav-container">
        <Navbar expand="lg" className="middle-nav">
          <Navbar.Brand>
            <img
              src={overlayImage} // Replace with your image URL
              alt="Your Logo"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <div className="header-title-container">
            <h2 className="header-title">Compassionate Care Emporium</h2>
          </div>
          <div className="middle-nav-link-container">
            <Nav className="ms-auto align-items-end">
              {/* Align links to the right */}
              <Link to="/cart" className="nav-link">
                Cart ()
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </Nav>
          </div>
        </Navbar>
      </div>

      <div className="bottom-nav-container">
        <Navbar expand="lg" className="bottom-nav">
          <div className="bottom-nav-link-container">
            <Nav className="me-auto">
              <Link to="/products" className="nav-link">
                All Products
              </Link>
              <Link to="/products" className="nav-link">
                Around the House
              </Link>
              <Link to="/products" className="nav-link">
                Comfort
              </Link>
              <Link to="/products" className="nav-link">
                Safety
              </Link>
            </Nav>
          </div>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBar;
