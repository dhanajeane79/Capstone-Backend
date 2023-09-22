// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
import React from "react";
import NavBar from "./NavBar"; 
import "../CSS-Components/StyleLayout.css"; 

function Layout({ children }) {
  return (
    <div>
      <main className="page-content">{children}</main>
      <footer className="home-footer">
        <p>&copy; All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout; 