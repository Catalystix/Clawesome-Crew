import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from "semantic-ui-react";
import { Segment, Grid, Image, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import logoImg from "../../assets/catlogo.png";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Grid columns={2} padded style={{ backgroundColor: "#45a29e" }}>
      <Grid.Column>
        <Link to="/">
          <Image
            src={logoImg}
            width="100"
            length="100"
            className="left floated"
          />
        </Link>
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
      </Grid.Column>
      <Grid.Column verticalAlign="right" textAlign="middle">
        <Grid.Row></Grid.Row>
        <Grid.Row>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <Button
                style={{ background: "#1f2833", color: "white" }}
                className="btn btn-lg btn-light m-2"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                <Button style={{ background: "#1f2833", color: "white" }}>
                  Login
                </Button>
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                <Button style={{ background: "#1f2833", color: "white" }}>
                  Signup
                </Button>
              </Link>
            </>
          )}
        </Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default Header;
