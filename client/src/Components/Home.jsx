/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import "../CSS-Components/Home.css";
function Home() {
  const categoryCards = Array.from({ length: 6 }, (_, index) => index + 1); 
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Compassionate Care Emporium</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </header>

      <Link to="/products" className="shop-now-button">
        <button className="btn btn-primary">Shop Now</button>
      </Link>
      <div className="category-card-container">
        <section className="top-category-row">
          {categoryCards.slice(0, 3).map((cardNumber) => (
            <div key={cardNumber} className="category-card">
              <h3>Category {cardNumber}</h3>
              {/* Add other content for the category card */}
            </div>
          ))}
        </section>

        <section className="bottom-category-row">
          {categoryCards.slice(3).map((cardNumber) => (
            <div key={cardNumber} className="category-card">
              <h3>Category {cardNumber}</h3>
              {/* Add other content for the category card */}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Home;