import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';

export default function NavTabs() {
  return (
    <div style={{ backgroundColor: "#45a29e" }}>
      <Menu pointing secondary size="large">
        <Menu.Item
          as={Link}
          to="/APOD"
          name="Pic of the Day"
          style={{
            color: "#564f6f",
          }}
        />
        <Menu.Item
          name="Mars Photos"
          as={Link}
          to="/mars"
          style={{
            color: "#564f6f",
          }}
        />
        <Menu.Item
          name="Space Articles"
          as={Link}
          to="/tech"
          style={{
            color: "#564f6f",
          }}
        />
        <Menu.Item
          name="Favorites"
          as={Link}
          to="/favorites"
          style={{
            color: "#564f6f",
          }}
        />
      </Menu>
    </div>
  );
}
