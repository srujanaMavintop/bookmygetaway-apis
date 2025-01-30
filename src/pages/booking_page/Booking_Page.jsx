import React from "react";
import TripDetails from "../trip_details/Trip_Details";
import PassengerForm from "../passenger_form/Passenger_Form";
import Footer from "../footer/Footer";
import "./booking_page.css"
import Header from "../header/Header";

const BookingPage = () => {
  return (
    <div className="entire-page">
        <Header/>
    <div className="booking-container">      
      <div className="left">
        <TripDetails />
      </div>
      <div className="right">
        <PassengerForm />
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default BookingPage;
