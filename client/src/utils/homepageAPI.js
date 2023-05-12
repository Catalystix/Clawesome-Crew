import axios from "axios";
//import apiKey from "../index";
const apiKey = "huGQeej7axeAR780FAY6PpPXzLNl8sO1kwknGben";

export async function apodCall() {
  // const [pictures, setPictures] = useState(null);
  // try {
  //   useEffect(() => {
  //     const response = axios.get("http://localhost:3000/APOD");
  //     const data = response.data;
  //     return data;
  //   });
  // const response = await axios.get("http://localhost:3000/APOD");
  // const data = response.data;
  // const explanation = data.explanation;
  // const photo = data.url;
  // localStorage.setItem("photo_explanation", explanation);
  // localStorage.setItem("photo_today", photo);
  // return data;
  // } catch (error) {
  //   console.error(error);
  // }
}

export async function marsCall() {
  // hope's api key
  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1&api_key=${apiKey}`
    );

    // pull all data
    const data = response.data;

    const photos = data.photos;
    const randomIndex = Math.floor(Math.random() * photos.length);
    const randomPhoto = photos[randomIndex];

    const roverName = randomPhoto.rover.name;
    const roverStatus = randomPhoto.rover.status;
    const photoUrl = randomPhoto.img_src;

    localStorage.setItem("rover_name", roverName);

    // steal rover status
    // console.log(`Rover status: ${roverStatus}`);
    localStorage.setItem("status", roverStatus);

    // steal photo URL
    // console.log(`Photo URL: ${photoUrl}`);
    localStorage.setItem("mars photo", photoUrl);

    // catch errors
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function techCall() {
  // hope's api key
  try {
    const response = await axios.get(
      `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`
    );

    // pulls all data
    const data = response.data;
    // console.log(data);

    // const results = data.results;
    // console.log(results);

    // // this is taking the data and returning only the edited titles
    // // we need to still return everything and then map it in TechDisplay -HOPE
    // const titles_edited = results.map((data) => {
    //   return data[2].replace(/<[^>]*>/g, "");
    // });
    // console.log(titles_edited);

    // // pics random article
    // // don't think we need this anymore -HOPE
    // const randomIndex = Math.floor(Math.random() * results.length);
    // const randomResult = results[randomIndex];

    // the data we want to use
    // const articleID = `https://technology.nasa.gov/patent/${results[1]}`;
    // const articleTitle = results[2];
    // const articleImg = results[10];
    // const articleDescription = results[3];

    // this is returning everything, can't send specific data over to TechDisplay -HOPE
    return data;

    // catch errors
  } catch (error) {
    console.error(error);
  }
}
