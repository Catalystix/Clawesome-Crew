const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const apiKey = process.env.REACT_APP_API_KEY;
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/APOD", async (req, res) => {
  const response = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
  );
  const data = response.data;
  return data;
});

app.get("/mars", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1",
    headers: {
      "x-nasa-host": "api.nasa.gov",
      "x-nasa-key": process.env.REACT_APP_API_KEY,
    },
  };
});

app.get("/tech", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.nasa.gov/techtransfer/patent/?engine",
    headers: {
      "x-nasa-host": "api.nasa.gov",
      "x-nasa-key": process.env.REACT_APP_API_KEY,
    },
  };
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
