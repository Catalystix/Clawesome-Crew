import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_IMAGE, ADD_ARTICLE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { Segment, Image, Button, Divider } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

const ApodDisplay = () => {
  const apodTest = async () => {
    const response = await axios.get("/APOD");
    return response.data;
  };
  const [addImage, { error }] = useMutation(ADD_IMAGE, {refetchQueries: [{query:QUERY_ME}]});
  const [pod, setPod] = useState({});
  useEffect(() => {
    const data = apodTest();
    console.log("apod data", data);
    setPod(data);
  }, []);

  // 'photo' is logging! not sure if it's being saved to database and is not being rendered in favorites
  async function savePhoto(photo) {
    console.log("photo", photo);
    const { data } = await addImage({
      variables: photo,
    });
  }

  return (
    <div style={{ backgroundColor: "#1f2833" }}>
      <Segment basic>
        <div
          className="ui padded segment"
          style={{ backgroundColor: "#1f2833", textAlign: "center" }}
        >
          <h2>Astronomy Picture of the Day</h2>

          <div className="toggleButton">
            <Button
              inverted
              color="teal"
              className="ui very padded"
              onClick={async () => {
                const data = await apodTest();
                console.log("podAPI", data);
                setPod(data);
              }}
            >
              POD Search
            </Button>
            <Divider />

            <div style={{ textAlign: "center" }}>
              <Image
                src={pod?.hdurl}
                size="big"
                centered
                raised
                bordered
              ></Image>
              <Divider />
              <Button 
                style={{backgroundColor: "#ffa500", color: "#ffffff"}}
                content="Add to Favorites"
                icon="star"
                hovered={true}
                data-img={pod?.hdurl}
                data-name={pod?.title}
                onClick={(e) =>
                  savePhoto({
                    url: e.target.dataset.img,
                    name: e.target.dataset.name,
                  })
                }
              ></Button>
            </div>
          </div>
        </div>
      </Segment>
    </div>
  );
};

export default ApodDisplay;
