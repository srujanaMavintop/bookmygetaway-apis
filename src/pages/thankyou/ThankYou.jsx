import React, { useState } from "react";
import "./ThankYou.css"; // Optional: Add styling for the Thank You page

const ThankYouPage = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  return (
    <div className="thank-you-page">
      <div className="background-overlay"></div>
      <div className="content-container">
        <header>
          <div className="logo">BookMyGetaway</div>
        </header>

        <div className="thank-you-container">
          <h2>Thank You for Booking with Us!</h2>
          <p className="thank-you-message">
            We are excited to host you! Your booking has been successfully completed.
            Here's a quick overview of your booking details.
          </p>

          

          <div className="rating-section">
            <h3>Rate Your Experience</h3>
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`star ${rating > index ? "filled" : ""}`}
                  onClick={() => setRating(index + 1)}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <p>Your rating: {rating} Stars</p>
          </div>

          <div className="share-section">
            <h3>Share Your Experience</h3>
            <p>Help us spread the word about your wonderful experience!</p>
            <div className="social-icons">
              <a href="https://www.facebook.com/sharer/sharer.php?u=your-url" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="social-icon" />
              </a>
              
              <a href="https://www.instagram.com/?url=your-url" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="social-icon" />
              </a>
            </div>
            <p className="share-prompt">
              Or simply share with your friends!
            </p>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2025 BookMyGetaway. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ThankYouPage;
