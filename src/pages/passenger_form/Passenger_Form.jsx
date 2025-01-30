import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./passenger_form.css";

const PassengerForm = () => {
  const [passengers, setPassengers] = useState([
    { id: 1, title: "Mr", first_name: "", last_name: "", age: "" }
  ]);
  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (index, e) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][e.target.name] = e.target.value;
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { id: passengers.length + 1, title: "Mr", first_name: "", last_name: "", age: "" }
    ]);
  };

  const removePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/passenger-details", { passengers });
      alert("All Passenger details saved!");
      setPassengers([{ id: 1, title: "Mr", first_name: "", last_name: "", age: "" }]);
      navigate("/pay"); // Redirect to /pay page
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="passenger-form">
      <h2>Passenger Details (Total: {passengers.length})</h2>
      <form onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <div key={passenger.id} className="passenger-box">
            <div className="passenger-header">
              <h3>Traveller {index + 1}</h3>
              {index > 0 && (
                <button type="button" onClick={() => removePassenger(index)}>
                  Remove
                </button>
              )}
            </div>

            <div className="form-group">
              <label>Title:</label>
              <select
                name="title"
                value={passenger.title}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
              </select>

              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={passenger.age}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>

            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={passenger.first_name}
                onChange={(e) => handleChange(index, e)}
                required
              />

              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={passenger.last_name}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={addPassenger}>
          Add Traveller
        </button>
        <button type="submit">Submit All</button>
      </form>
    </div>
  );
};

export default PassengerForm;
