import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_IMAGE = gql`
mutation addImage($url: String!, $name: String!) {
  addImage(url: $url, name: $name) {
    _id
    name
    url
  }
}`

export const REMOVE_IMAGE = gql`
mutation removeImage($imageId: ID!) {
  removeImage(imageId: $imageId) {
    _id
    name
    url
    description
  }
}`

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ARTICLE = gql`
  mutation addArticle($articleText: String!) {
    addArticle(articleText: $articleText) {
      _id
      articleText
      articleAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($articleId: ID!, $commentText: String!) {
    addComment(articleId: $articleId, commentText: $commentText) {
      _id
      articleText
      articleAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
