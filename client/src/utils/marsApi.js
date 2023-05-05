import React from 'react';

let searchButton = document.querySelector("#search")

// searchButton.addEventListener("click", () =>{
//     sendMarsApiRequest()
// })



//2. mars rover
//rover.name
//rover.status
//img src
//earth date
async function sendMarsApiRequest () {
    let apiKey = "huGQeej7axeAR780FAY6PpPXzLNl8sO1kwknGben"
    let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`)
    let data = await response.json()
    console.log(data)
        const photos = data.photos;
        const randomIndex = Math.floor(Math.random() * photos.length);
        const randomPhoto = photos[randomIndex];
        
        const roverName = randomPhoto.rover.name;
        const roverStatus = randomPhoto.rover.status;
        const earthDate = randomPhoto.earth_date;
        const photoUrl = randomPhoto.img_src;
        

        console.log(`Rover name: ${roverName}`);
        console.log(`Rover status: ${roverStatus}`);
        console.log(`Earth date: ${earthDate}`);
        console.log(`Photo URL: ${photoUrl}`);
}

export default  sendMarsApiRequest


//3. picture of day
//picture
//explination
//copywrite
//title
//https://api.nasa.gov/planetary/apod?api_key=${apiKey}

//maybe - EPIC
