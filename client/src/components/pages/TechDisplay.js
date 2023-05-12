import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ARTICLE } from "../../utils/mutations";
import { Segment, Grid, Image, Card, Button, Divider } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

const TechDisplay = () => {
  const [addArticle, { err }] = useMutation(ADD_ARTICLE);
  const [articles, setArticles] = useState([]);

  const techTest = async () => {
    const response = await axios.get(`/tech`);
    return response.data;
  };

  useEffect(async () => {
    const data = await techTest();

    // data.results is the array of results we were trying to get in homepageAPI, better to return here instead so it can be accessed by 'articles' -HOPE
    setArticles(data.results);
    console.log(articles);
  }, []);

  async function saveArticle(article) {
    console.log("article", article);
    const { data } = await addArticle({
      variables: article,
    });
  }

  return (
    <div style={{ backgroundColor: "#1f2833" }}>
      <Segment basic>
        <div
          className="ui padded segment"
          style={{ backgroundColor: "#1f2833", textAlign: "center" }}
        >
          <h2>Tech Article of the Day</h2>
          <div className="toggleButton">
            <Button
              inverted
              color="teal"
              className="ui very padded"
              onClick={async () => {
                const data = await techTest();
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
                      <Card.Header>
                        {/* 'article[2] targets the title of each article, the replace method edits out that weird styling text -HOPE */}
                        {article[2].replace(/<[^>]*>/g, "")}
                      </Card.Header>
                      <Card.Description>
                        {/* Same replace method applied here -HOPE */}
                        {article[3].replace(/<[^>]*>/g, "")}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra textAlign="center">
                      <div className="ui two buttons">
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
                              description: e.target.dataset.description,
                            });
                          }}
                        />
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

export default TechDisplay;
