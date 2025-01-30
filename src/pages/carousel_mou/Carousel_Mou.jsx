import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./carousel_mou.css";
import hp1 from './hp1.png';
import hp2 from './hp2.png';
import hp3 from './hp3.png';
import sk1 from './sk1.png';
import sk2 from './sk2.png';
import sk3 from './sk3.png';
import jk1 from './jk1.png';
import jk2 from './jk2.png';
import jk3 from './jk3.png';
import ll1 from './ll1.png';
import ll2 from './ll2.png';
import ll3 from './ll3.png';



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

const Carousel_Mou = () => {
  const carouselData1 = [
    {
      title: "Himachal Pradesh",
      subtitle: "North India, India",
      description:
        "Himachal Pradesh is known for its stunning mountain landscapes and is a popular destination for trekking and adventure sports.",
      temperature: "-10°C",
      aqi: "AQI 178",
      image: hp1,
    },
    {
      title: "Usual Trip Duration",
      subtitle: "4-5 days",
      description:
        "A 4-5 day trip to Himachal Pradesh allows you to explore the beautiful hill stations, go trekking in the Himalayas, visit ancient temples, and experience the local culture and cuisine. Immerse yourself in the natural beauty and adventure activities of the region.",
      image: hp2,
    },
    {
      title: "Places To Visit",
      subtitle: ["Rohtang Pass", "Shimla", "Manali", "Kullu"],
      image: hp3,
    },
    // Add more slides if needed
  ];

  const carouselData2 = [
    {
      title: "Sikkim",
      subtitle: "East India, India",
      description:
        "Sikkim is known for its stunning natural beauty, including the majestic Himalayan mountains, and is a popular destination for trekking and adventure tourism.",
      temperature: "-2°C",
      aqi: "AQI 126",
      image: sk1,
    },
    {
      title: "Usual trip duration",
      subtitle: "3-4 days",
      description:
        "A 3-4 day trip to Sikkim allows you to explore the capital city of Gangtok, visit the famous Tsomgo Lake, and take in the breathtaking views of the Himalayas. You can also experience the rich culture and traditions of the region.",
      
      image: sk2,
    },
    {
      title: "Places to Visit",
      subtitle: ["Tsomgo Lake", 'Gurudongmar Lake', 'Tashiding Monastery', 'Hanuman Tok', 'Kabi Lungchok', 'Seven Sisters Waterfall'],
      image: sk3,
    },
    // Add more slides if needed
  ];

  const carouselData3 = [
    {
      title: "Gulmarg",
      subtitle: "Jammu and Kashmir, India",
      description:
        "Gulmarg is known for its stunning natural beauty and is a popular destination for skiing and snowboarding in the winter months.",
      temperature: "-4°C",
      aqi: "AQI 58",
      image: jk1,
    },
    {
      title: "Usual trip duration",
      subtitle: "3-4 days",
      description:
        "A 3-4 day trip to Gulmarg allows you to experience the beauty of the snow-capped mountains, indulge in winter sports like skiing and snowboarding, take a ride on the Gulmarg Gondola, and explore the scenic landscapes through trekking or nature walks.",
      image: jk2,
    },
    {
      title: "Places to visit",
      subtitle: ["Gulmarg Gondola",'Gulmarg Golf Course', 'Khilanmarg', 'Eleven Miles '],
      image: jk3,
    },
    // Add more slides if needed
  ];

  const carouselData4 = [
    {
      title: "Leh-Ladakh",
      subtitle: "Jammu and Kashmir, India",
      description:
        "Leh-Ladakh is known for its stunning landscapes, Buddhist monasteries, and adventurous activities such as trekking and mountaineering, making it a popular destination for nature lovers and adventure enthusiasts.",
      temperature: "-9°C",
      aqi: "AQI 58",
      image: ll1,
    },
    {
      title: "Usual trip duration",
      subtitle: "5-7 days",
      description:
        "A 5-7 day trip to Leh-Ladakh allows you to explore the stunning landscapes, visit monasteries, and experience the unique culture of the region. You can also indulge in adventure activities like trekking and river rafting.",
      image: ll2,
    },
    {
      title: "Places To Visit",
      subtitle: ["Lamayuru Monastery", 'Magnetic Hill', 'Nubra Valley', 'Pristine Lake Reflections: Tranquil boat ride 🛶',],
      image: ll3,
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

export default Carousel_Mou;
