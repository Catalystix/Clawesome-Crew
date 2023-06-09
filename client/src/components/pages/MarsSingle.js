import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_IMAGE, ADD_ARTICLE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { Segment, Image, Card, Button, Divider } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

const MarsDisplay = () => {
  const marsTest = async () => {
    const response = await axios.get(`/mars`);
    return response.data;
  };
  const [addImage, { error }] = useMutation(ADD_IMAGE, {refetchQueries: [{query:QUERY_ME}]});
  const [mars, setMars] = useState([]);
  useEffect(async () => {
    const data = await marsTest();
    console.log("mars data", data.photos);
    setMars(data.photos);
  }, []);

  async function savePhoto(photo) {
    console.log("photo", photo);
    const { data } = await addImage({
      variables: photo,
    });
  }

  //is there a way to only display one random photo untl the user clicks 'Mars Search' -HOPE
  return (
    <div style={{ backgroundColor: "#1f2833" }}>
      <Segment basic>
        <div
          className="ui padded segment"
          style={{ backgroundColor: "#1f2833", textAlign: "center" }}
        >
          <h2>Mars Rover Picture of the Day</h2>

          <div className="toggleButton">
            <Button
              inverted
              color="teal"
              className="ui very padded"
              onClick={async () => {
                const data = await marsTest();
                console.log("data", data);
                setMars(data.photos);
              }}
            >
              Mars Search
            </Button>
            <Divider />
            <div>
              <Card.Group itemsPerRow={5}>
                {mars.map((mars) => (
                  <Card key={mars.id} raised>
                    <Image src={mars.img_src} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>Rover: {mars.rover.name}</Card.Header>
                      <Card.Meta>Status: {mars.rover.status}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button style={{backgroundColor: "#ffa500", color: "#ffffff"}}
                          content="Add to Favorites"
                          icon="star"
                          data-img={mars.img_src}
                          data-name={mars.rover.name}
                          onClick={(e) =>
                            savePhoto({
                              url: e.target.dataset.img,
                              name: e.target.dataset.name,
                            })
                          }
                        ></Button>
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            </div>
          </div>
        </div>
      </Segment>
    </div>
  );
};

export default MarsDisplay;
