import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Image, Segment, Button, Divider } from "semantic-ui-react";
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
    <div style={{ backgroundColor: "#1f2833" }}>
      <div id="welcome">
        <h1>Welcome to The Daily Clawsmic!</h1>
      </div>
      <Segment basic>
        <div
          className="ui padded segment"
          style={{ backgroundColor: "#1f2833" }}
        >
          <Card fluid style={{ backgroundColor: "#1f2833", boxShadow: "none" }}>
            <Card.Content style={{ display: "flex", justifyContent: "center" }}>
              <div id="carousel">
                <div id="imgDiv">
                  {photoSlide.map((slide, index) => (
                    <div
                      className={`slide ${
                        index === currentIndex ? "active" : ""
                      }`}
                      key={index}
                    >
                      {index === currentIndex && (
                        <Image src={slide.url} alt={slide.name} size="large" />
                      )}
                    </div>
                  ))}
                </div>
                <Divider />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    inverted
                    color="teal"
                    className="prev"
                    onClick={prevSlide}
                  >
                    Prev
                  </Button>
                  <Button
                    inverted
                    color="teal"
                    className="next"
                    onClick={nextSlide}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </Segment>
    </div>
  );
};

export default Home;
