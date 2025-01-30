import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
      <header className="header">
        <div className="logo">
          <a className="navbar-brand" href="#">
            <img 
              src="./pics/logo.png" 
              alt="" 
              className="d-inline-block align-text-top" 
            />
            BookMyGetaway
          </a>
        </div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Destinations</a></li>
            <li><a href="#" className="active">GroupTravelHub</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </nav>
        <div className="log-sign">
          <a href="../auth/index.html" className="login-button">Log In</a>
          <a href="../auth/index.html" className="signin-button">Sign Up</a>
        </div>
      </header>
  );
};

export default Navbar;
