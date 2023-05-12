import React from "react";
import { useQuery, gql } from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";

import { Segment, Grid, Image } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';


export default function Favorites() {
    const {loading, data} = useQuery(QUERY_ME)
    console.log(data, "display favorites data")
    const allSaved = data.me || []
    console.log(allSaved, "allSaved");
   
    
  
      if (loading) return <p>Loading...</p>;
    //   if (error) return <p>Error :</p>;
  
    //   return <img src={data.image.url} />;
    
  
    return (
      <div>
        <Segment>
          <Image src=" " />
        </Segment>
      </div>
    );
  
    }


