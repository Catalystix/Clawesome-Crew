import React from "react";
import { useQuery, useMutation, gql } from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";

import { Segment, Grid, Image, Card, Icon } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { REMOVE_IMAGE, REMOVE_ARTICLE } from "../../utils/mutations";


export default function Favorites() {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || [];

  const [deleteArticle] = useMutation(REMOVE_ARTICLE, {
    update(cache, { data: { deleteArticle } }) {
      cache.modify({
        fields: {
          me(existingMeRef, { readField }) {
            return {
              ...existingMeRef,
              articles: existingMeRef.articles.filter(
                (articleRef) => deleteArticle._id !== readField('_id', articleRef)
              )
            };
          }
        }
      });
    }
  });

  const [deleteImage] = useMutation(REMOVE_IMAGE, {
    update(cache, { data: { deleteImage } }) {
      cache.modify({
        fields: {
          me(existingMeRef, { readField }) {
            return {
              ...existingMeRef,
              images: existingMeRef.images.filter(
                (imageRef) => deleteImage._id !== readField('_id', imageRef)
              )
            };
          }
        }
      });
    }
  });

  const handleDelete = (id, type) => {
    if (type === 'image') {
      deleteImage({
        variables: { imageId: id },
      });
    } else if (type === 'article') {
      deleteArticle({
        variables: { articleId: id },
      });
    }
  };

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
            <Card.Group itemsPerRow={5}>
              {user?.images.map((image) => (
                <Card key={image._id} style={{ backgroundColor: "#1f2833", boxShadow: "none"}}>
                  <Image src={image.url} />
                  <Icon
                    circular
                    inverted
                    name="delete"
                    color="red"
                    size="small"
                    onClick={() => handleDelete(image._id, 'image')}
                  />
                </Card>
              ))}

              {user?.articles.map((article) => (
                <Card key={article._id} style={{ backgroundColor: "#ffffff", boxShadow: "none" }}>
                  <Card.Content>
                    <Card.Header>{article.title}</Card.Header>
                    <Card.Description>{article.description}</Card.Description>
                    <Image key={article._id} src={article.image} />
                  </Card.Content>
                  <Icon
                    circular
                    inverted
                    name="delete"
                    color="red"
                    size="small"
                    onClick={() => handleDelete(article._id, 'article')}
                  />
                </Card>
              ))}
            </Card.Group>
          </Segment>
        </div>
      )}
    </>
  );
}


{/* {user?.articles.map((articles) => (
                <Image key={articles._id} src={articles.description} />

              ))} */}