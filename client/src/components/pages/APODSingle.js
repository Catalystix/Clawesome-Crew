import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_IMAGE, ADD_ARTICLE } from "../../utils/mutations";
import { apodCall } from "../../utils/homepageAPI";
import { Segment, Grid, Image, Button, Divider } from "semantic-ui-react";
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
    <div style={{ backgroundColor: "#1f2833" }}>
    <Segment basic>
    <div className="ui padded segment" style={{ backgroundColor: "#1f2833" }}>
        <h2>Astronomy Picture of the Day</h2>

        <div className="toggleButton">
        <Button
            inverted
            color="teal"
            className="ui very padded"
            onClick={async () => {
              const data = await apodCall();
              console.log("podAPI", data);
              setPod(data);
            }}
          >
            POD Search
          </Button>
          <Divider />

          <div style={{ textAlign: "center" }}>
            <Image src={pod?.hdurl} size="huge" centered></Image>
            <Divider />
            <Button
              color="red"
              content="Save"
              icon="heart"
              data-img={pod?.hdurl}
              data-name={pod?.title}
              onClick={(e) =>
                savePhoto({
                  url: e.target.dataset.img,
                  name: e.target.dataset.name,
                })
              }
            >
            </Button>
          </div>
        </div>
      </div>
    </Segment>
    </div>
  );
};

export default ApodDisplay;
