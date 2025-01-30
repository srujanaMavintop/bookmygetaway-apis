import React from 'react';
import './navbar.css';
import logo from "../../pics/logo.png"

const Navbar = () => {
  return (
      <header className="header">
        <div className="logo">
          <a className="navbar-brand" href="#">
            <img 
              src={logo} 
              alt="logo" 
              className="d-inline-block align-text-top" 
            />
            BookMyGetaway
          </a>
        </div>
        <nav>
          <ul>
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#dest">Destinations</a></li>
            <li><a href="#tmate">GroupTravelHub</a></li>
            <li><a href="#blog">About Us</a></li>
          </ul>
        </nav>
        <div className="log-sign">
          <a href="http://127.0.0.1:5500/src/auth/index.html" className="login-button">Log In</a>
          <a href="http://localhost:3000" className="signin-button">Sign Up</a>
        </div>
      </header>
  );
};

export default Navbar;
