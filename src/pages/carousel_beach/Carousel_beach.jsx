import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./carousel_beach.css";
import an1 from "./an1.png";
import an2 from "./an2.png";
import an3 from "./an3.png";
import g1 from "./g1.png";
import g2 from "./g2.png";
import g3 from "./g3.png";
import p1 from "./p1.png";
import p2 from "./p2.png";
import p3 from "./p3.png";
import dd1 from "./dd1.png";
import dd2 from "./dd2.png";
import dd3 from "./dd3.png";


const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateCarousel = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-slide"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="carousel-item"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="carousel-content">
              <h2>{item.title}</h2>
              {Array.isArray(item.subtitle) ? (
                <ul>
                  {item.subtitle.map((sub, i) => (
                    <li key={i}>{sub}</li>
                  ))}
                </ul>
              ) : (
                <h4>{item.subtitle}</h4>
              )}
              {Array.isArray(item.description) ? (
                <ul>
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.description}</p>
              )}
              <div className="weather-info">
                <span>{item.temperature}</span>
                <span>{item.aqi}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-buttons">
        {/* <button
          className="carousel-button"
          onClick={() =>
            updateCarousel(currentIndex === 0 ? items.length - 1 : currentIndex - 1)
          }
        >
          &#10094;
        </button>
        <button
          className="carousel-button"
          onClick={() =>
            updateCarousel(currentIndex === items.length - 1 ? 0 : currentIndex + 1)
          }
        >
          &#10095;
        </button> */}
      </div>
      <div className="dots">
        {items.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => updateCarousel(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

const Carousel_Beach = () => {
  const carouselData1 = [
    {
      title: "Andaman and Nicobar",
      subtitle: "India",
      description:
        "The Andaman and Nicobar Islands are known for their stunning beaches, crystal-clear waters, and rich marine life, making it a popular destination for beach lovers and scuba diving enthusiasts.",
      temperature: "29°C",
      aqi: "AQI 17",
      image: an1 ,
    },
    {
      title: "Usual Trip Duration",
      subtitle: "4-5 days",
      description:
        "A 4-5 day trip to Andaman and Nicobar Islands allows you to explore the pristine beaches, indulge in water sports like snorkeling and scuba diving, visit historical sites like Cellular Jail, and experience the rich marine life through activities like glass-bottom boat rides.",
      image: an2,
    },
    {
      title: "Places To Visit",
      subtitle: ["Radhanagar Beach", "Ross Islands", "Cellular Jail", "Elephant Beach", "Laxmanpur Beach", "North Bay Islands"],
      image: an3,
    },
    // Add more slides if needed
  ];

  const carouselData2 = [
    {
      title: "Goa",
      subtitle: "India",
      description:
        "Goa is known for its beautiful beaches, vibrant nightlife, and Portuguese colonial architecture, making it a popular destination for relaxation and partying.",
      temperature: "25°C",
      aqi: "AQI 56",
      image: g1,
    },
    {
      title: "Usual trip duration",
      subtitle: "2-3 days",
      description:
        "If you're short on time, a weekend trip to Goa can offer a quick escape. You can relax on the beach, visit a few popular attractions, and savor the vibrant nightlife.",
      image: g2,
    },
    {
      title: "Places to Visit",
      subtitle: ["Baga Beach", "Dudhsagar Falls", "Cape Goa Cliff", "Chapora Fort", "Butterfly Beach"],
      image: g3,
    },
    // Add more slides if needed
  ];

  const carouselData3 = [
    {
      title: "Pondicherry",
      subtitle: "India",
      description:
        "Pondicherry is known for its French colonial architecture and serene beaches, making it a popular destination for relaxation and cultural exploration.",
      temperature: "29°C",
      aqi: "AQI 114",
      image: p1,
    },
    {
      title: "Usual trip duration",
      subtitle: "2-3 days",
      description:
        "A 2-3 day trip to Pondicherry allows you to explore the French Quarter, relax on the beautiful beaches, indulge in delicious French cuisine, and visit the Aurobindo Ashram and Auroville for a spiritual experience. ",
      image: p2,
    },
    {
      title: "Places to visit",
      subtitle: ["Paradise Beach",'White Town', 'Promenade Beach', 'Auroville','Church of Our Lady of Angels'],
      image: p3,
    },
    // Add more slides if needed
  ];

  const carouselData4 = [
    {
      title: "Daman and Diu",
      subtitle: "India",
      description:
        "Daman and Diu is known for its beautiful beaches and Portuguese colonial architecture, making it a popular destination for relaxation and cultural exploration.",
      temperature: "32°C",
      aqi: "AQI 112",
      image: dd1,
    },
    {
      title: "Usual trip duration",
      subtitle: "2-3 days",
      description:
        "A 2-3 day trip to Daman and Diu allows you to explore the beautiful beaches, visit historical forts and churches, and indulge in water sports activities. It's a perfect short getaway to relax and enjoy the coastal beauty.",
      image:dd2,
    },
    {
      title: "Places To Visit",
      subtitle: ["Fort Jerome", 'Nagoa Beach', 'Diu Fort', 'Jallandhar Beach','Mirasol Lake Garden','Moti Daman Fort'],
      image: dd3,
    },
    // Add more slides if needed
  ];

  return (
    <div>
      <Navbar />
      <Carousel items={carouselData1} />
      <Carousel items={carouselData2} />
      <Carousel items={carouselData3} />
      <Carousel items={carouselData4} />
      <Footer />
    </div>
  );
};

export default Carousel_Beach;
