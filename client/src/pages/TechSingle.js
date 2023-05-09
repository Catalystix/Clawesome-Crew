import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { techCall } from "../utils/homepageAPI";
import { QUERY_ARTICLES } from "../utils/queries";
import { ADD_IMAGE, ADD_ARTICLE } from "../utils/mutations";
import { Segment, Grid, Image } from "semantic-ui-react";

const styles = {
  img: {
    maxHeight: "200px",
    maxWidth: "200px",
  },
  overflow: {
    whiteSpace: "nowrap",
    width: "700px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

const TechDisplay = () => {
  const [addArticle, { err }] = useMutation(ADD_ARTICLE);
  const [articles, setArticles] = useState([]);

  async function saveArticles(article) {
    console.log("article", article);
    const { data } = await addArticle({
      variables: article,
    });
  }

  techCall();
  const article_ID = localStorage.getItem("article_ID");
  const article_img = localStorage.getItem("article_img");
  const article_description = localStorage.getItem("article_description");
  return (
    <Segment>
      <div style={styles.overflow}>
        <h2>Tech Article of the Day</h2>
        <a href={article_ID} target="_blank" rel="noreferrer">
          <img style={styles.img} src={article_img} alt="tech stuff"></img>
          {article_description}
        </a>
        <div className="toggleButton">
        <button
          onClick={async () => {
            const data = await techCall();
            console.log("data", data);
            setArticles(data.articles);
          }}
        >
          Tech Search
        </button>
      </div>
    </div>
    </Segment>
    
  );
};

export default TechDisplay;
