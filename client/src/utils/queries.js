import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      articles {
        _id
        description
        createdAt
      }
    }
  }
`;

export const QUERY_ARTICLES = gql`
  query getArticles {
    articles {
      _id
      description
      articleAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_ARTICLE = gql`
  query getSingleArticle($articleId: ID!) {
    article(articleId: $articleId) {
      _id
      description
      articleAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const GET_IMAGE = gql`
query image {
    url
    name
  
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      articles
       {
        _id
        description
        articleAuthor
        createdAt
      }
      images {
        _id
        url
        name
      }
    }
  }
`;
