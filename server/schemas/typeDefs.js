const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    articles: [Article]!
  }

  type Article {
    _id: ID
    articleText: String
    articleAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    articles(username: String): [Article]
    article(articleId: ID!): Article
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addArticle(articleText: String!): Article
    addComment(articleId: ID!, commentText: String!): Article
    removeArticle(articleId: ID!): Article
    removeComment(articleId: ID!, commentId: ID!): Article
  }
`;

module.exports = typeDefs;
