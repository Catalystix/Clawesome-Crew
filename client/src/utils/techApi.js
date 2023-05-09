import React from "react";
import axios from "axios";
//import apiKey from "../index";
const apiKey = "huGQeej7axeAR780FAY6PpPXzLNl8sO1kwknGben";

let searchButton = document.querySelector("#search");

// searchButton.addEventListener("click", () =>{
//     sendMarsApiRequest()
// })

//1. tech transfer
// https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}
//2 link
// 11 picture
//get patent/article ID

async function sendTechApiRequest() {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${process.env.REACT_APP_API_KEY}`
    );

    // pulls all data
    const data = response.data;

    const results = data.results;

    // logs all data
    // console.log(results);

    // pics random article
    const randomIndex = Math.floor(Math.random() * results.length);
    const randomResult = results[randomIndex];

    // logs the random article
    // console.log(randomResult);

    // logs the data we want to use
    const articleID = `https://technology.nasa.gov/patent/${randomResult[1]}`;
    const articleTitle = randomResult[2];
    const articleImg = randomResult[10];
    const articleDescription = randomResult[3];

    // steal article id
    // console.log(`article ID: ${articleID}`);
    localStorage.setItem("article_ID", articleID);

    // steal article title (it displays weird)
    // console.log(`article Title: ${articleTitle}`);
    localStorage.setItem("article_title", articleTitle);

    //steal article image
    // console.log(`article Img: ${articleImg}`);
    localStorage.setItem("article_img", articleImg);

    // steal article description (it displays better but is long)
    // console.log(`article Description: ${articleDescription}`);
    localStorage.setItem("article_description", articleDescription);

    // catch errors
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default sendTechApiRequest;
