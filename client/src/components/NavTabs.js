import React from 'react';
import { Menu } from 'semantic-ui-react';

export default function NavTabs({ currentPage, handlePageChange }) {
  return (
    <div style={{ backgroundColor: "#2d283e" }}>
      <Menu pointing secondary size="large">
        <Menu.Item
          name="Pic of the Day"
          active={currentPage === "APODsection"}
          onClick={() => handlePageChange("APODsection")}
          style={{
            color: currentPage === "APODsection" ? "#d1d7e0" : "#564f6f",
            borderBottom:
              currentPage === "APODsection" ? "2px solid #d1d7e0" : "",
          }}
        />
        <Menu.Item
          name="Mars Photos"
          active={currentPage === "MarsDisplay"}
          onClick={() => handlePageChange("ProjecMarsDisplayts")}
          style={{
            color: currentPage === "MarsDisplay" ? "#d1d7e0" : "#564f6f",
            borderBottom:
              currentPage === "MarsDisplay" ? "2px solid #d1d7e0" : "",
          }}
        />
        <Menu.Item
          name="Space Articles"
          active={currentPage === "TechArticle"}
          onClick={() => handlePageChange("TechArticle")}
          style={{
            color: currentPage === "TechArticle" ? "#d1d7e0" : "#564f6f",
            borderBottom:
              currentPage === "TechArticle" ? "2px solid #d1d7e0" : "",
          }}
        />
        <Menu.Item
          name="Favorites"
          active={currentPage === "Favorites"}
          onClick={() => handlePageChange("Favorites")}
          style={{
            color: currentPage === "Favorites" ? "#d1d7e0" : "#564f6f",
            borderBottom:
              currentPage === "Favorites" ? "2px solid #d1d7e0" : "",
          }}
        />
      </Menu>
    </div>
  );
}
