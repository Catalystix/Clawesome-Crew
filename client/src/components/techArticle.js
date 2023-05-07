import React from "react";

import sendTechApiRequest from "../utils/techApi";

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

const TechArticle = () => {
  sendTechApiRequest();
  const article_ID = localStorage.getItem("article_ID");
  const article_img = localStorage.getItem("article_img");
  const article_description = localStorage.getItem("article_description");
  return (
    <div style={styles.overflow}>
      <h2>Tech Article of the Day</h2>
      <a href={article_ID} target="_blank" rel="noreferrer">
        <img style={styles.img} src={article_img} alt="tech stuff"></img>
        {article_description}
      </a>
    </div>
  );
};

export default TechArticle;
