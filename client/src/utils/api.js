let searchButton = document.querySelector("#search")

searchButton.addEventListener("click", () =>{
    sendMarsApiRequest()
})



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
}

export sendMarsApiRequest modules.ez

//1. tech transfer
// https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}
//2 link
// 11 picture
//get patent/article ID



//3. picture of day
//picture
//explination
//copywrite
//title
//https://api.nasa.gov/planetary/apod?api_key=${apiKey}

//maybe - EPIC
