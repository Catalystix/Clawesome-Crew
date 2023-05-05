import React from 'react';

let searchButton = document.querySelector("#search")

// searchButton.addEventListener("click", () =>{
//     sendMarsApiRequest()
// })


//1. tech transfer
// https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}
//2 link
// 11 picture
//get patent/article ID

async function sendTechApiRequest () {
    let apiKey = "huGQeej7axeAR780FAY6PpPXzLNl8sO1kwknGben"
    let response = await fetch(`https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`)
    let data = await response.json()
    console.log(data)
      
        const results = data.results;
        const randomIndex = Math.floor(Math.random() * results.length);
        const randomResult = results[randomIndex];
        
        const articleID = randomResult[1];
        const articleTitle = randomResult[2];
        const articleImg = randomResult[10];
      

        console.log(`article ID: ${articleID}`);
        console.log(`article Title: ${articleTitle}`);
        console.log(`article Img: ${articleImg}`);

      }

export default  sendTechApiRequest
