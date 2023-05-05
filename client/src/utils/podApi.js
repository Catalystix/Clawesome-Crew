import React from 'react';

let searchButton = document.querySelector("#search")

// searchButton.addEventListener("click", () =>{
//     sendMarsApiRequest()
// })



//3. picture of day
//picture
//explination
//copywrite - I didn't see a copywrite?
//title

async function sendPODApiRequest () {
    let apiKey = "huGQeej7axeAR780FAY6PpPXzLNl8sO1kwknGben"
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    let data = await response.json()
    console.log(data)
        const date = data.date;
        const explanation = data.explanation;
        const photo = data.url;
        const title = data.title;
        

        console.log(`date: ${date}`);
        console.log(`explanation: ${explanation}`);
        console.log(`photo: ${photo}`);
        console.log(`title: ${title}`);
}

export default  sendPODApiRequest




