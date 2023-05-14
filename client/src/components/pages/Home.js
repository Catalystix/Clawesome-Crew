import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

const Home = () => {
  const apodCount = async () => {
    const response = await axios.get("/landing");
    return response.data;
  };

  const [photoSlide, setPhotoSlide] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apodCount();
      console.log("apod data", data);

      const slides = data.map((photo) => {
        return {
          url: photo.url,
          name: photo.title,
        };
      });

      setPhotoSlide(slides);
    };

    fetchData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photoSlide.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photoSlide.length - 1 : prevIndex - 1
    );
  };

  return (
    <div id="carousel">
      <div id="imgDiv">
        {photoSlide.map((slide, index) => (
          <div
            className={`slide ${index === currentIndex ? "active" : ""}`}
            key={index}
          >
            {index === currentIndex && <img src={slide.url} alt={slide.name} />}
          </div>
        ))}
      </div>
      <div>
        <button className="prev" onClick={prevSlide}>
          Prev
        </button>
        <button className="next" onClick={nextSlide}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
