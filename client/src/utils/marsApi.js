import React from "react";
import axios from "axios";
import apiKey from "../index";

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
  // hope's api key
  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`
    );

    // pull all data
    const data = response.data;

    const photos = data.photos;
    const randomIndex = Math.floor(Math.random() * photos.length);
    const randomPhoto = photos[randomIndex];

    const roverName = randomPhoto.rover.name;
    const roverStatus = randomPhoto.rover.status;
    const earthDate = randomPhoto.earth_date;
    const photoUrl = randomPhoto.img_src;

    // steal rover name
    console.log(`Rover name: ${roverName}`);
    localStorage.setItem("rover_name", roverName);

    // steal rover status
    console.log(`Rover status: ${roverStatus}`);
    localStorage.setItem("status", roverStatus);

    // earth date
    console.log(`Earth date: ${earthDate}`);

    // steal photo URL
    console.log(`Photo URL: ${photoUrl}`);
    localStorage.setItem("mars photo", photoUrl);

    // catch errors
  } catch (error) {
    console.error(error);
  }
}

export default sendMarsApiRequest;

//maybe - EPIC
