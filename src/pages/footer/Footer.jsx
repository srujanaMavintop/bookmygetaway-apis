import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div>
        <footer>
    <div className="footer-container">
      {/* <!-- Footer Navigation --> */}
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#destinations">Flights</a></li>
          <li><a href="#deals">Hotels</a></li>
          <li><a href="#about">Trains</a></li>
          <li><a href="#contact">Buses</a></li>
        </ul>
      </div>

      {/* <!-- Contact Info --> */}
      <div className="footer-section">
        <h3>Contact Us</h3>
        <p>Email: info@travelplanner.com</p>
        <p>Phone: +1 (123) 456-7890</p>
        <p>Address: 1234 Adventure Rd, Wanderlust City, USA</p>
      </div>

      {/* <!-- Social Media Links --> */}
      <div className="footer-section">
        <h3>Follow Us</h3>
        <ul className="social-icons">
          <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
          <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
          <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
        </ul>
      </div>
    </div>

    {/* <!-- Copyright Section --> */}
    <div className="footer-bottom">
      <p>&copy; 2024 BookMyGetaway. All rights reserved.</p>
    </div>
  </footer>
    </div>
  )
}

export default Footer