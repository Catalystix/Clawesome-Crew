import React, { useState } from "react";
import NavTabs from "./NavTabs";
import Header from "./Header/index";
import Footer from "./Footer/index";
import ApodDisplay from "../pages/APODSingle";
import MarsDisplay from "../pages/MarsSingle";
import TechDisplay from "../pages/TechSingle";

import CSS from "./style.css";

export default function CosmosContainer() {
  const [currentPage, setCurrentPage] = useState("APOD");

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === "APOD") {
      return <ApodDisplay />;
    }
    if (currentPage === "Mars") {
      return <MarsDisplay />;
    }
    if (currentPage === "TechArticle") {
      return <TechDisplay />;
    }
    //! commenting out for now until we add this
    // if (currentPage === 'Favorite') {
    //     return <Favorite />;
    // }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <Header />
      <div className="container">
        <NavTabs
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
        {renderPage()}
      </div>
      <Footer />
    </div>
  );
}
