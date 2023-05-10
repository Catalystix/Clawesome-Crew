import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_IMAGE, ADD_ARTICLE } from "../../utils/mutations";
import { apodCall } from "../../utils/homepageAPI";
import { Segment, Grid, Image } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

const styles = {
  img: {
    maxHeight: "200px",
    maxWidth: "200px",
  },
};

const ApodDisplay = () => {
  const [addImage, { error }] = useMutation(ADD_IMAGE);
  const [pod, setPod] = useState({});
  useEffect(async () => {
    const data = await apodCall();
    console.log("podAPI", data);
    setPod(data);
  }, []);
  // const photo = localStorage.getItem("photo_today");
  // const explanation = localStorage.getItem("photo_explanation");

  async function savePhoto(photo) {
    console.log("photo", photo);
    const { data } = await addImage({
      variables: photo,
    });
  }

  return (
    <Segment basic>
      <div>
        <h2>Astronomy Picture of the Day</h2>

        {/* <img style={styles.img} src={photo} alt="space"></img>
        <p>{explanation}</p> */}
        <div className="toggleButton">
          <button
            onClick={async () => {
              const data = await apodCall();
              console.log("podAPI", data);
              setPod(data);
            }}
          >
            POD Search
          </button>

          <div>
            <Image src={pod?.hdurl} size="huge"></Image>
            <button
              data-img={pod?.hdurl}
              data-name={pod?.title}
              onClick={(e) =>
                savePhoto({
                  url: e.target.dataset.img,
                  name: e.target.dataset.name,
                })
              }
            >
              Save Photo
            </button>
          </div>
        </div>
      </div>
    </Segment>
  );
};

export default ApodDisplay;
