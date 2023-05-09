import React from "react";
import { apodCall } from "../utils/homepageAPI";
import { Segment, Grid, Image } from "semantic-ui-react";

const styles = {
  img: {
    maxHeight: "200px",
    maxWidth: "200px",
  },
};

const ApodDisplay = () => {
  apodCall();
  const photo = localStorage.getItem("photo_today");
  const explanation = localStorage.getItem("photo_explanation");

  return (
    <div>
      <h2>Astronomy Picture of the Day</h2>
      <img style={styles.img} src={photo} alt="space"></img>
      <p>{explanation}</p>
    </div>
  );
};

export default ApodDisplay;
