import React from "react";
import { useQuery, gql } from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";

import { Segment, Image, Card, Icon } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';



export default function Favorites() {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || []
  console.log(user, 'favorites display user');

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div style={{ backgroundColor: "#1f2833" }}>
          <Segment basic>
            <div className="ui padded segment" style={{ backgroundColor: "#1f2833", textAlign: "center" }}>
              <h2>Favorites</h2>
            </div>
            <Card.Group itemsPerRow={5} >
              {user?.images.map((image) => (
                <Card raised key={image._id} style={{backgroundColor: "#1f2833",  boxShadow: "none"}}>
                  <Image src={image.url} />
                  <Icon circular inverted 
                    name="delete"
                    color="red"
                    size="small"
                    // onClick={() => handleDelete(image._id)}
                  />
                </Card>
              ))}
            </Card.Group>

              {user?.articles.map((articles) => (
                <Image key={articles._id} src={articles.description} />

              ))}
          </Segment>
        </div>
      )}
    </>
  );
}
