import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Segment, Grid, Image } from "semantic-ui-react";

import { QUERY_SINGLE_ARTICLE } from "../../utils/queries";

const SingleArticle = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { articleId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_ARTICLE, {
    // pass URL parameter
    variables: { articleId: articleId },
  });

  const article = data?.article || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Segment>
      <div className="my-3">
        <h3 className="card-header bg-dark text-light p-2 m-0">
          {article.articleAuthor} <br />
          <span style={{ fontSize: "1rem" }}>
            had this article on {article.createdAt}
          </span>
        </h3>
        <div className="bg-light py-4">
          <blockquote
            className="p-4"
            style={{
              fontSize: "1.5rem",
              fontStyle: "italic",
              border: "2px dotted #1a1a1a",
              lineHeight: "1.5",
            }}
          >
            {article.articleText}
          </blockquote>
        </div>

        <div className="my-5"></div>
        <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}></div>
      </div>
    </Segment>
  );
};

export default SingleArticle;
