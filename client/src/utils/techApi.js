import React from 'react';
import axios from 'axios';

let searchButton = document.querySelector("#search")

// searchButton.addEventListener("click", () =>{
//     sendMarsApiRequest()
// })


//1. tech transfer
// https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}
//2 link
// 11 picture
//get patent/article ID

async function sendTechApiRequest() {
  const apiKey = "huGQeej7axeAR780FAY6PpPXzLNl8sO1kwknGben";
  try {
    const response = await axios.get(`https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`);
    const data = response.data;

    const results = data.results;
    const randomIndex = Math.floor(Math.random() * results.length);
    const randomResult = results[randomIndex];
    console.log(randomResult, "randomresult")

    const articleID = randomResult[1];
    const articleTitle = randomResult[2];
    const articleImg = randomResult[10];

    console.log(`article ID: ${articleID}`);
    console.log(`article Title: ${articleTitle}`);
    console.log(`article Img: ${articleImg}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}


export default  sendTechApiRequest
