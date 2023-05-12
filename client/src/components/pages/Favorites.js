import React from "react";
import { useQuery, gql } from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";

import { Segment, Grid, Image } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { Article } from "../../../../server/models";


export default function Favorites() {
    const {loading, data} = useQuery(QUERY_ME);
    const user = data?.me || []
    console.log(user, 'favorites display user');
     
     
    //   if (error) return <p>Error :</p>;
  
    //   return <img src={data.image.url} />;
    
  
    return (
      <>
      {loading ? (
        <div>Loading</div>
      ):(
      <div style={{ backgroundColor: "#1f2833" }}>
        <Segment basic>
            <div className="ui padded segment" style={{ backgroundColor: "#1f2833", textAlign: "center" }}> 
                <h2>Favorites</h2>
            </div>
            {user?.images.map((image)=>(
              <Image key={image._id} src={image.url} />
            ))}
            {}

            
        </Segment>
      </div>
      )}
      </>
    );
  
    }


