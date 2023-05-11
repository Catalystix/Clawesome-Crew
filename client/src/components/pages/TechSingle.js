import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { techCall } from "../../utils/homepageAPI";
import { ADD_ARTICLE } from "../../utils/mutations";
import { Segment, Grid, Image, Card, Button, Divider } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const TechDisplay = () => {
  const [addArticle, { err }] = useMutation(ADD_ARTICLE);
  const [articles, setArticles] = useState([]);

  useEffect(async () => {
    const data = await techCall();
    console.log("techapi", data);
    setArticles(data.results);
  }, []);

  async function saveArticle(article) {
    console.log("article", article);
    const { data } = await addArticle({
      variables: article
    });
  }

  return (
    <div style={{ backgroundColor: "#1f2833" }}>
      <Segment basic>
        <div style={{ backgroundColor: "#1f2833" }}>
          <h2>Tech Article of the Day</h2>
          <div className="toggleButton">
            <Button
              inverted
              color="teal"
              className="ui very padded"
              onClick={async () => {
                const data = await techCall();
                console.log("data", data);
                setArticles(data.results);
              }}
            >
              Tech Search
            </Button>
            <Divider />
            <div>
              <Card.Group>
                {articles.map((article) => (
                  <Card key={article[0]} raised>
                    <a
                      href={`https://technology.nasa.gov/patent/${article[1]}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image src={article[10]} alt="tech stuff" />
                    </a>
                    <Card.Content>
                      <Card.Header>{article[1]}</Card.Header>
                      <Card.Description>{article[3]}</Card.Description>
                    </Card.Content>
                    <Card.Content extra textAlign="center">
                      <Button
                        color="red"
                        content="Save"
                        icon="heart"
                        data-url={article[1]}
                        data-img={article[10]}
                        data-description={article[3]}
                        onClick={(e) => {
                          e.preventDefault();
                          saveArticle({
                            url: e.target.dataset.url,
                            img: e.target.dataset.img,
                            description: e.target.dataset.description
                          });
                        }}
                      />
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

export default TechDisplay;
