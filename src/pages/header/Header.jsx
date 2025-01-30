import React from "react";
import "./header.css"; // External CSS
import tlogo from "../../pics/train.png";
import flogo from "../../pics/flight.png";
import hlogo from "../../pics/hotel.png";
import logo from "../../pics/logo.png"

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
        <div className="logo">BookMyGetaway</div>
      </div>
      <nav>
        <ul>
          <li>
            <img src={flogo} alt="Flights" />
            <a href="/flights" className="active">
              Flights
            </a>
          </li>
          <li>
            <img src={hlogo} alt="Hotels" />
            <a href="/hotels">Hotels</a>
          </li>
          <li>
            <img src={tlogo} alt="Trains" />
            <a href="/trains">Trains</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;