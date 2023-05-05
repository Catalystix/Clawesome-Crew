import React from 'react';
import axios from 'axios';

let searchButton = document.querySelector("#search")

// searchButton.addEventListener("click", () =>{
//     sendMarsApiRequest()
// })



//3. picture of day
//picture
//explination
//copywrite - I didn't see a copywrite?
//title

async function sendPODApiRequest() {
    const apiKey = "huGQeej7axeAR780FAY6PpPXzLNl8sO1kwknGben";
    try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
      const data = response.data;
  
      const date = data.date;
      const explanation = data.explanation;
      const photo = data.url;
      const title = data.title;
  
      console.log(`date: ${date}`);
      console.log(`explanation: ${explanation}`);
      console.log(`photo: ${photo}`);
      console.log(`title: ${title}`);
    } catch (error) {
      console.error(error);
    }
  }

export default  sendPODApiRequest




