import React, { useEffect, useState } from "react";
import axios from "axios";
import "./trip_details.css";
import ai from "../../pics/air-india.png";

const TripDetails = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const res = await axios.get("http://localhost:8800/trip-details");
        setTrips(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTripDetails();
  }, []);

  return (
    <div className="trip-container">
      {trips.map((trip) => (
        <div className="trip-card" key={trip.id}>
        <h1>Trip Details</h1>

          {/* Airline and Flight Info */}
          <div className="airline">
            <img src={ai} alt="Air India Logo" className="airline-logo" />
            <div>
              {/* <p className="airline-name">{trip.airline}</p> */}
              <p className="airline-name">Air India</p>

              {/* <p className="flight-number">{trip.flight_details}</p> */}
              <p className="flight-number">{trip.flight_details}</p>

            </div>
          </div>

          {/* Flight Details */}
          <div className="flight-details">
            <div className="departure">
              {/* <p className="time">{trip.departure_time}</p> */}
              <p className="time">10:50</p>
              <p className="airport">{trip.from_location}</p>
              
              <p className="terminal">Kempegowda International Airport  {trip.departure_terminal}</p>
            </div>

            <div className="duration">
              {/* <p className="duration-text">{trip.duration}</p> */}
              <p className="duration-text">3hr </p>

            </div>

            <div className="arrival">
              {/* <p className="time">{trip.arrival_time}</p> */}
              <p className="time">13:30</p>

              <p className="airport">{trip.to_location}</p>
              <p className="terminal">Indira Gandhi International Airport {trip.arrival_terminal}</p>
            </div>
          </div>

          {/* Baggage Details */}
          <div className="baggage-info">
            <p>Cabin: <strong> 7 Kg</strong> (1 piece per pax)</p>
            <p>Check-in: <strong>15 Kg</strong> (1 piece per pax)</p>
          </div>

          {/* Aircraft Details */}
          <div className="aircraft-info">
            <p>{trip.aircraft_type} | {trip.seating} | {trip.seat_features}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripDetails;
