import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flights');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [fromSkyId, setFromSkyId] = useState('');
  const [toSkyId, setToSkyId] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Fetch city suggestions (for autocomplete)
  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5001/flights-autocomplete`, {
        params: { query },
      });

      if (response.status) {
        setSuggestions(response.data.airports);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error.message);
    }
  };

  // Handle selection of a suggestion (autocomplete)
  const handleSelectSuggestion = (skyId, cityName, setCity, setSkyId, setSuggestions) => {
    setCity(cityName); // Set the city name
    setSkyId(skyId); // Set the SkyId directly from the suggestion
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div>
      <section className="hero">
        <div className="abstract">
          <p style={{ color: '#df4b15', marginBottom: '0%', fontWeight: 'bold' }}>
            Your Travel Services
          </p>
          <h1 style={{ color: 'whitesmoke', marginTop: '0%', fontWeight: 'bold' }}>
            Best Escape Choice
          </h1>
          <p style={{ color: 'whitesmoke', fontWeight: 'lighter' }}>
            Experience the Best in Travel: A Journey Beyond Your Imagination, Where Every
            Destination Becomes an Unforgettable Adventure.
          </p>
        </div>

        {/* Search bar */}
        <div className="search-container">
          <div className="tabs">
            <button
              className={activeTab === 'flights' ? 'active' : ''}
              onClick={() => handleTabClick('flights')}
            >
              Flights
            </button>
            <button
              className={activeTab === 'hotels' ? 'active' : ''}
              onClick={() => handleTabClick('hotels')}
            >
              Hotels
            </button>
            <button
              className={activeTab === 'trains' ? 'active' : ''}
              onClick={() => handleTabClick('trains')}
            >
              Trains
            </button>
          </div>

          {/* Flights Tab */}
          {activeTab === 'flights' && (
            <div id="flights" className="search-bar">
              <div className="input-container">
                <div className="ribbon">From City</div>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={fromCity}
                  onChange={(e) => {
                    setFromCity(e.target.value);
                    fetchSuggestions(e.target.value, setFromSuggestions);
                  }}
                />
                {/* Display suggestions */}
                {fromSuggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {fromSuggestions.map((suggestion) => (
                      <li
                        key={suggestion.skyId}
                        onClick={() =>
                          handleSelectSuggestion(
                            suggestion.skyId,
                            suggestion.cityName,
                            setFromCity,
                            setFromSkyId,
                            setFromSuggestions
                          )
                        }
                      >
                        {suggestion.cityName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="input-container">
                <div className="ribbon">To City</div>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={toCity}
                  onChange={(e) => {
                    setToCity(e.target.value);
                    fetchSuggestions(e.target.value, setToSuggestions);
                  }}
                />
                {/* Display suggestions */}
                {toSuggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {toSuggestions.map((suggestion) => (
                      <li
                        key={suggestion.skyId}
                        onClick={() =>
                          handleSelectSuggestion(
                            suggestion.skyId,
                            suggestion.cityName,
                            setToCity,
                            setToSkyId,
                            setToSuggestions
                          )
                        }
                      >
                        {suggestion.cityName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="input-container">
                <div className="ribbon">Travel Date</div>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>
              <div className="input-container">
                <div className="ribbon">Passengers</div>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter number"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                />
              </div>
              <a href="/flights">
                <button>Search Flight</button>
              </a>
            </div>
          )}

          {/* Hotels Tab */}
          {activeTab === 'hotels' && (
            <div id="hotels" className="search-bar">
              <div className="input-container">
                <div className="ribbon">Location</div>
                <input type="text" placeholder="Enter location" />
              </div>
              <div className="input-container">
                <div className="ribbon">Check-in Date</div>
                <input type="date" />
              </div>
              <div className="input-container">
                <div className="ribbon">Check-out Date</div>
                <input type="date" />
              </div>
              <div className="input-container">
                <div className="ribbon">Adults</div>
                <input type="number" min="1" placeholder="Enter number" />
              </div>
              <a href="/hotels">
                <button>Search Hotel</button>
              </a>
            </div>
          )}

          {/* Trains Tab */}
          {activeTab === 'trains' && (
            <div id="trains" className="search-bar">
              <div className="input-container">
                <div className="ribbon">From City</div>
                <input type="text" placeholder="Enter city" />
              </div>
              <div className="input-container">
                <div className="ribbon">To City</div>
                <input type="text" placeholder="Enter city" />
              </div>
              <div className="input-container">
                <div className="ribbon">Travel Date</div>
                <input type="date" />
              </div>
              <div className="input-container">
                <div className="ribbon">Passengers</div>
                <input type="number" min="1" placeholder="Enter number" />
              </div>
              <a href="/trains">
                <button>Search Train</button>
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hero;
