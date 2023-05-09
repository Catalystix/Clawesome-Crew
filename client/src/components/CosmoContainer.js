import React, { useState } from 'react';
import NavTabs from './NavTabs';
import Header from './Header/index';
import Footer from './Footer/index';
import APOD from "../pages/APODsection";
import Mars from "../pages/marsPhotoDisplay";
import TechArticle from "../pages/techArticle";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import SingleArticle from "../pages/SingleArticle";
import Profile from "../pages/Profile";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import CSS from './style.css';

export default function CosmosContainer() {
  const [currentPage, setCurrentPage] = useState("APOD");

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === "APOD") {
      return <APOD />;
    }
    if (currentPage === "Mars") {
      return <Mars />;
    }
    if (currentPage === "TechArticle") {
      return <TechArticle />;
    }
    //! commenting out for now until we add this
    // if (currentPage === 'Favorite') {
    //     return <Favorite />;
    // }
  };

  // Construct request middleware that will attach the JWT token to every request as an `authorization` header
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("id_token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLink = createHttpLink({
    uri: "/graphql",
  });

  const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <div className="container">
              <NavTabs
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
              {renderPage()}
            </div>
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/me" element={<Profile />} />
                <Route path="/profiles/:username" element={<Profile />} />
                <Route
                  path="/articles/:articleId"
                  element={<SingleArticle />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    </div>
  );
}