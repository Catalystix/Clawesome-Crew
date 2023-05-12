import React from "react";
import { Segment, Grid, Image } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

export default function Favorites() {
    return(
    <div style={{ backgroundColor: "#1f2833" }}>
        <Segment basic>
            <div className="ui padded segment" style={{ backgroundColor: "#1f2833", textAlign: "center" }}> 
                <h2>Favorites</h2>
            </div>
        </Segment>
    </div>  
)}
