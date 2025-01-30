import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Train.css";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const Train = () => {
    const [trains, setTrains] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8800/trains")
            .then(response => {
                setTrains(response.data);
            })
            .catch(error => {
                console.error("Error fetching train data:", error);
            });
    }, []);

    return (
        <div className="train-list">
            <Header />
            {trains.map(train => (
                <div className="train-card" key={train.train_id}>
                    {/* ✅ Use train image from MySQL */}
                    {train.img ? (
                        <img 
                            src={train.img} 
                            alt={train.train_name} 
                            className="train-image"
                        />
                    ) : (
                        <p>No Image Available</p>
                    )}
                    <div className="train-details">
                        <h2 className="train-name">{train.train_name}</h2>
                        <p className="route">{train.from_city} → {train.to_city}</p>
                        <p className="time">Departure: {train.departure_time} | Arrival: {train.arrival_time}</p>
                        <p className="class">Class: {train.class}</p>
                    </div>
                    <div className="train-price">
                        <p className="price">₹{train.price}</p>
                        <p className="taxes">+ Taxes & Operations</p>
                        <a href="/booking_page"><button className="check-availability">Check Availability</button></a>
                        
                    </div>
                </div>
            ))}
            <Footer />
        </div>
    );
};

export default Train;
