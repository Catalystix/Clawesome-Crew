import React from "react";
import axios from "axios";

let searchButton = document.querySelector("#search");

// searchButton.addEventListener("click", () =>{
//     sendMarsApiRequest()
// })

//3. picture of day
//picture
//explination
//copywrite - I didn't see a copywrite?
//title

async function sendPODApiRequest() {
  // hope's api key
  const apiKey = "MxhQtdOQo4057bQmauxgjMkK7jcdbyB7ceB3CHyK";
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    );
    const data = response.data;

    //log all the data
    console.log(response.data);

    const date = data.date;
    const explanation = data.explanation;
    const photo = data.url;
    const title = data.title;

    // steal the date
    console.log(`date: ${date}`);

    // steal the explanation
    console.log(`explanation: ${explanation}`);
    localStorage.setItem("photo_explanation", explanation);

    // steal the photo link
    console.log(`photo: ${photo}`);
    localStorage.setItem("photo_today", photo);

    // steal the title
    console.log(`title: ${title}`);

    // log the errors
  } catch (error) {
    console.error(error);
  }
}

export default sendPODApiRequest;
