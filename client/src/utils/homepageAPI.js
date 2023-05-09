import axios from "axios";

export async function apodCall() {
  // hope's api key
  const apiKey = "MxhQtdOQo4057bQmauxgjMkK7jcdbyB7ceB3CHyK";
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    );
    const data = response.data;

    const explanation = data.explanation;
    const photo = data.url;

    localStorage.setItem("photo_explanation", explanation);

    localStorage.setItem("photo_today", photo);
  } catch (error) {
    console.error(error);
  }
}

export async function marsCall() {
  // hope's api key
  const apiKey = "MxhQtdOQo4057bQmauxgjMkK7jcdbyB7ceB3CHyK";
  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`
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
  } catch (error) {
    console.error(error);
  }
}

export async function techCall() {
  // hope's api key
  const apiKey = "MxhQtdOQo4057bQmauxgjMkK7jcdbyB7ceB3CHyK";
  try {
    const response = await axios.get(
      `https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`
    );

    // pulls all data
    const data = response.data;

    const results = data.results;

    // pics random article
    const randomIndex = Math.floor(Math.random() * results.length);
    const randomResult = results[randomIndex];

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
  } catch (error) {
    console.error(error);
  }
}
