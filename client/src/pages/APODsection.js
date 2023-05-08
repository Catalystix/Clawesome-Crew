import React from "react";
import sendPODApiRequest from "../utils/podApi";
import { Segment, Grid, Image } from 'semantic-ui-react';

const styles = {
  img: {
    maxHeight: "200px",
    maxWidth: "200px",
  },
};

const APODsection = () => {
  sendPODApiRequest();
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

export default APODsection;
