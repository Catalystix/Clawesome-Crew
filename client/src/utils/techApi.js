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

}

export default  sendTechApiRequest




//3. picture of day
//picture
//explination
//copywrite
//title
//https://api.nasa.gov/planetary/apod?api_key=${apiKey}

//maybe - EPIC
