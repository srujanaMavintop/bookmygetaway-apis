import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./carousel_rel.css";
import am1 from './am1.png';
import am2 from './am2.png';
import am3 from './am3.png';
import ay1 from './ay1.png';
import ay2 from './ay2.png';
import ay3 from './ay3.png';
import b1 from './b1.png';
import b2 from './b2.png';
import b3 from './b3.png';
import t1 from './t1.png';
import t2 from './t2.png';
import t3 from './t3.png';



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
      {/* <div className="carousel-buttons">
        <button
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
        </button>
      </div> */}
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

const Carousel_Rel = () => {
  const carouselData1 = [
    {
      title: "Benaras",
      subtitle: "Uttar Pradesh, India",
      description:
        "Varanasi is known for being one of the oldest continuously inhabited cities in the world and is a major pilgrimage site for Hindus, attracting visitors to experience its spiritual and cultural significance.",
      temperature: "30°C",
      aqi: "AQI 138",
      image: b1,
    },
    {
      title: "Usual Trip Duration",
      subtitle: "2-3 days",
      description:
        "A 2-3 day trip to Varanasi allows you to explore the ancient city, visit the famous ghats along the Ganges River, witness the Ganga Aarti ceremony, and immerse yourself in the spiritual and cultural heritage of the region.",
      image: b2,
    },
    {
      title: "Places To Visit",
      subtitle: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Assi Ghat", "Tulsi Manas Temple", 'Jantar Mantar', 'Nandeshwar Ghat'],
      image: b3,
    },
    // Add more slides if needed
  ];

  const carouselData2 = [
    {
      title: "Ayodhya",
      subtitle: "Uttar Pradesh, India",
      description:
        "Ayodhya is known for being the birthplace of Lord Rama and is a popular pilgrimage site for Hindus.",
      temperature: "32°C",
      aqi: "AQI 98",
      image: ay1,
    },
    {
      title: "Usual trip duration",
      subtitle: "2-3 days",
      description:
        "A 2-3 day trip to Ayodhya allows you to explore the historical and religious significance of the city. You can visit the Ram Janmabhoomi, Hanuman Garhi, and other temples, as well as learn about the rich cultural heritage of the region.",
      image: ay2,
    },
    {
      title: "Places to Visit",
      subtitle: ["Ram Janmabhoomi Temple", 'Hanumangarhi Temple', 'Kanak Bhavan Temple', 'Treta Ke Thakur Temple', 'Kanak Bharti Park', 'Ram Ki Paidi'],
      image: ay3,
    },
    // Add more slides if needed
  ];

  const carouselData3 = [
    {
      title: "Amritsar",
      subtitle: "Punjab, India",
      description:
        "Amritsar is known for the Golden Temple, a sacred Sikh shrine, and is a popular destination for its rich history, culture, and delicious Punjabi cuisine.",
      temperature: "36°C",
      aqi: "AQI 158",
      image: am1,
    },
    {
      title: "Usual trip duration",
      subtitle: "4-5 days",
      description:
        "With 4-5 days in Amritsar, you can delve deeper into the city's history and heritage, visit the Wagah Border for the patriotic ceremony, explore the markets and bazaars, and take a day trip to the serene and beautiful Pul Kanjari.",
      image: am2,
    },
    {
      title: "Places to visit",
      subtitle: ["Golden Temple",'Jallianwala Bagh', 'Akal Takht', 'Partition Museum','Gobindgarh Fort','Durgiana Temple','Gurudwara Baba Budha Ji'],
      image: am3,
    },
    // Add more slides if needed
  ];

  const carouselData4 = [
    {
      title: "Tirupati",
      subtitle: "Andhra Pradesh, India",
      description:
        "Tirupati is known for its famous Sri Venkateswara Temple and is a popular pilgrimage destination for Hindus.",
      temperature: "30°C",
      aqi: "AQI 103",
      image: t1,
    },
    {
      title: "Usual trip duration",
      subtitle: "2-3 days",
      description:
        "A 2-3 day trip to Tirupati allows you to visit the famous Tirumala Venkateswara Temple, explore the natural beauty of the surrounding hills, and experience the spiritual and cultural essence of the city.",
      image: t2,
    },
    {
      title: "Places To Visit",
      subtitle: ["Sri Padmavathi Ammavari Temple", 'Sri Kapileswaraswami Temple', 'Sri Kodandaramaswami Temple', 'Sri Varahaswami Temple','Sri Kalyana Venkateswaraswami Temple'],
      image: t3,
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

export default Carousel_Rel;
