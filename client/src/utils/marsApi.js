import React from "react";
import axios from "axios";
//import apiKey from "../index";
const apiKey = "huGQeej7axeAR780FAY6PpPXzLNl8sO1kwknGben";

let searchButton = document.querySelector("#search");

// searchButton.addEventListener("click", () =>{
//     sendMarsApiRequest()
// })

//2. mars rover
//rover.name
//rover.status
//img src
//earth date

async function sendMarsApiRequest() {
  try {
    const response = await axios.get("http://localhost:3000/mars");

    // pull all data
    const data = response.data;

    const photos = data.photos;
    const randomIndex = Math.floor(Math.random() * photos.length);
    const randomPhoto = photos[randomIndex];

    const roverName = randomPhoto.rover.name;
    const roverStatus = randomPhoto.rover.status;
    // const earthDate = randomPhoto.earth_date;
    const photoUrl = randomPhoto.img_src;

    // steal rover name
    // console.log(`Rover name: ${roverName}`);
    localStorage.setItem("rover_name", roverName);

    // steal rover status
    // console.log(`Rover status: ${roverStatus}`);
    localStorage.setItem("status", roverStatus);

    // earth date
    // console.log(`Earth date: ${earthDate}`);

    // steal photo URL
    // console.log(`Photo URL: ${photoUrl}`);
    localStorage.setItem("mars photo", photoUrl);

    // catch errors
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default sendMarsApiRequest;

//maybe - EPIC
