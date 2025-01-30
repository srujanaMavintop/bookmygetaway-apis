import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";
import "./Flight.css";

const Flights = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/flights")
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
      });
  }, []);

  return (
    <div>
    <Header />
    <div className="flight-container">
      {flights.map((flight) => (
        <div key={flight.flight_id} className="flight-card">
          <div className="flight-card-left">
            {/* Use image from the database */}
            {flight.img ? (<img src={flight.img} alt={flight.airline} className="airline-logo" />)
             : (<p>No Image</p>)}
          </div>
          <div className="flight-card-middle">
            <h3 className="airline-name">{flight.airline}</h3>
            <p className="route">
              {flight.from_city} → {flight.to_city}
            </p>
            <p className="class">Class: {flight.class}</p>
          </div>
          <div className="timing">
            <span className="departure-time">{flight.start_time}</span>
            <span className="arrow">→</span>
            <span className="arrival-time">{flight.arrival_time}</span>
          </div>
          <div className="flight-card-right">
            <div className="price">₹{parseFloat(flight.price).toLocaleString()}</div>
            <p className="fees">Includes taxes and fees</p>
            <a href="/booking_page"><button className="book-button">Book</button></a>
            
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Flights;
