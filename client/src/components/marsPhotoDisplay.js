import React from "react";
import sendMarsApiRequest from "../utils/marsApi";

const styles = {
  img: {
    maxHeight: "200px",
    maxWidth: "200px",
  },
};

const MarsDisplay = () => {
  sendMarsApiRequest();
  const marsPhoto = localStorage.getItem("mars photo");
  const rover_name = localStorage.getItem("rover_name");
  const rover_status = localStorage.getItem("status");

  return (
    <div>
      <h2>Mars Rover Picture of the Day</h2>
      <img style={styles.img} src={marsPhoto} alt="mars"></img>
      <p>Rover: {rover_name}</p>
      <p>Status: {rover_status}</p>
    </div>
  );
};

export default MarsDisplay;
