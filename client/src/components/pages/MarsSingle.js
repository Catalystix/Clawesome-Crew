import React, { useState } from "react";
import { marsCall } from "../../utils/homepageAPI";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_IMAGE, ADD_ARTICLE } from "../../utils/mutations";
import { Segment, Grid, Image } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

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

  // const marsPhoto = localStorage.getItem("mars photo");
  // const rover_name = localStorage.getItem("rover_name");
  // const rover_status = localStorage.getItem("status");

  async function savePhoto(photo) {
    console.log("photo", photo);
    const { data } = await addImage({
      variables: photo,
    });
  }

  return (
    <Segment>
      <div>
        <h2>Mars Rover Picture of the Day</h2>
        {/* <img style={styles.img} src={marsPhoto} alt="mars"></img>
        <p>Rover: {rover_name}</p>
        <p>Status: {rover_status}</p> */}

        <div className="toggleButton">
          <button
            onClick={async () => {
              const data = await marsCall();
              console.log("data", data);
              setMars(data.photos);
            }}
          >
            Mars Search
          </button>
          {mars.map((mars) => (
            // modify css for this
            <div key={mars.id} className="flex w-100 ">
              <img style={styles.img} src={mars.img_src}></img>
              <p>Rover: {mars.rover.name}</p>
              <p>Status: {mars.rover.status}</p>

              <button
                data-img={mars.img_src}
                data-name={mars.rover.name}
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
          ))}
        </div>
      </div>
    </Segment>
  );
};
export default MarsDisplay;
