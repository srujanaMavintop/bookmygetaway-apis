import React, { useEffect, useState } from "react";
import "./RazorPayment.css"; 
import Footer from "../footer/Footer";

const PaymentPage = () => {
  const TIMER_LIMIT = 120; // Timer limit (in seconds) - You can set this to any desired value
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [fareSummary, setFareSummary] = useState({
    roomPrice: "Loading...",
    taxes: "Loading...",
    discount: "Loading...",
    total: "Loading...",
  });
  const [timer, setTimer] = useState(TIMER_LIMIT); // Set initial timer to the limit

  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded");
    };
    document.body.appendChild(script);

    // Dummy API fetch simulation
    setTimeout(() => {
      setFareSummary({
        roomPrice: "₹8,300",
        taxes: "₹1600",
        discount: "-₹488.57",
        total: "₹9,427.92",
      });
    }, 1000);

    // Countdown timer logic
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(interval); // Clear interval when timer reaches 0
          alert("Time's up! Please reload the page to restart the payment.");
          window.location.reload(); // Reload the page and reset the timer
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill out all fields.");
      return;
    }

    // Check if Razorpay script is loaded
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay script not loaded. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_vi9VslvyMiozbL", // Replace with your Razorpay key
      amount: 254792, // Amount in paise
      currency: "INR",
      name: "BookMyGetaway",
      description: "Payment for Booking",
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#ff7846",
      },
      handler: function (response) {
        window.location.href = "/thanks"; // Replace with your desired URL
    },
    modal: {
      escape: false, // Prevent closing the Razorpay modal
    },
  }
    

    // Initialize Razorpay if it's loaded
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="entire-page">
      {/* Header Section */}
      <header>
        <div className="logo">BookMyGetaway</div>
        <div className="timer">{formatTime(timer)}</div>
      </header>

      {/* Payment Section */}
      <div className="container">
        <div className="form-section">
          <h2>Billing Details</h2>
          <form>
            <label>Name:</label>
            <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />

            <label>Phone Number:</label>
            <input type="tel" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />

            <label>Email ID:</label>
            <input type="email" name="email" placeholder="Enter your email ID" value={formData.email} onChange={handleChange} required />
          </form>
        </div>

        <div className="summary-section">
          <h2>Fare Summary</h2>
          <div className="fare-summary">
            <div className="fare-row"><span>1 Room, 1 Night</span><span>{fareSummary.roomPrice}</span></div>
            <div className="fare-row"><span>Taxes & Charges</span><span>{fareSummary.taxes}</span></div>
            <div className="fare-row"><span>Discounts</span><span>{fareSummary.discount}</span></div>
            <div className="fare-row total"><span>Total Amount Payable</span><span>{fareSummary.total}</span></div>
            <button onClick={handlePayment}>Make Payment</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
