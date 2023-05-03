import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      articles {
        _id
        articleText
        createdAt
      }
    }
  }
`;

export const QUERY_ARTICLES = gql`
  query getArticles {
    articles {
      _id
      articleText
      articleAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_ARTICLE = gql`
  query getSingleArticle($articleId: ID!) {
    article(articleId: $articleId) {
      _id
      articleText
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      articles {
        _id
        articleText
        articleAuthor
        createdAt
      }
    }
  }
`;
