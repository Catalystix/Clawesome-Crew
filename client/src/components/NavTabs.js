import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';

export default function NavTabs({ currentPage, handlePageChange }) {
  return (
    <div style={{ backgroundColor: "#45a29e" }}>
      <Menu pointing secondary size="large">
        <Menu.Item
          as={Link}
          to="/APOD"
          name="Pic of the Day"
          style={{
            color: currentPage === "APOD" ? "#d1d7e0" : "#564f6f",
            borderBottom: currentPage === "APOD" ? "2px solid #d1d7e0" : "",
          }}
        />
        <Menu.Item
          name="Mars Photos"
          as={Link}
          to="/mars"
          style={{
            color: currentPage === "MarsDisplay" ? "#d1d7e0" : "#564f6f",
            borderBottom:
              currentPage === "MarsDisplay" ? "2px solid #d1d7e0" : "",
          }}
        />
        <Menu.Item
          name="Space Articles"
          as={Link}
          to="/tech"
          style={{
            color: currentPage === "TechArticle" ? "#d1d7e0" : "#564f6f",
            borderBottom:
              currentPage === "TechArticle" ? "2px solid #d1d7e0" : "",
          }}
        />
        <Menu.Item
          name="Favorites"
          as={Link}
          to="/favorites"
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
