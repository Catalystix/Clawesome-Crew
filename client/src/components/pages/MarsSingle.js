import React, { useState } from "react";
import { marsCall } from "../../utils/homepageAPI";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_IMAGE, ADD_ARTICLE } from "../../utils/mutations";
import { Segment, Grid, Image, Card, Button, Divider } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const styles = {
  img: {
    maxHeight: "200px",
    maxWidth: "200px",
  },
};

const MarsDisplay = () => {
  marsCall();

  const [mars, setMars] = useState([]);
  const [addImage, { error }] = useMutation(ADD_IMAGE);

  async function savePhoto(photo) {
    console.log("photo", photo);
    const { data } = await addImage({
      variables: photo,
    });
  }

  return (
    <div style={{ backgroundColor: "#1f2833" }}>
    <Segment basic>
      <div className="ui padded segment" style={{ backgroundColor: "#1f2833", textAlign: "center"  }}>
        <h2>Mars Rover Picture of the Day</h2>

        <div className="toggleButton">
          <Button
            inverted
            color="teal"
            className="ui very padded"
            onClick={async () => {
              const data = await marsCall();
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
                    <Button
                        color="red"
                        content="Save"
                        icon="heart"
                        data-img={mars.img_src}
                        data-name={mars.rover.name}
                        onClick={(e) =>
                          savePhoto({
                            url: e.target.dataset.img,
                            name: e.target.dataset.name,
                          })
                        }
                      >
                      </Button>
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
