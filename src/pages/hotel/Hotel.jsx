import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./Hotel.css";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/hotels") // Fetch data from backend
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="hotels-container">
        {hotels.length === 0 ? (
          <p>Loading hotels...</p>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <div className="hotel-image">
                {hotel.img ? (
                  <img src={hotel.img} alt={hotel.name} />
                ) : (
                  <p>No Image Available</p>
                )}
              </div>
              <div className="hotel-content">
                <h3 className="hotel-name">{hotel.name}</h3>
                <p className="hotel-location">{hotel.location}</p>
                <p className="hotel-description">{hotel.description}</p>
              </div>
              <div className="hotel-card-footer">
                <span className="hotel-rating">⭐ {hotel.rating.toFixed(1)}</span>
                <p className="hotel-price">₹{parseFloat(hotel.price).toLocaleString()}</p>
                <a href="/booking_page"><button className="book-button">Book Now</button></a>
                
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Hotels;
