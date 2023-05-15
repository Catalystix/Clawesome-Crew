import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { Segment, Grid, Image, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import logoImg from "../../assets/catlogo.png";

import Auth from "../../utils/auth";

const Header = () => {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // Set the current page based on the location object
  React.useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <div style={{ backgroundColor: "#v" }}>
      <Segment basic>
        <div
          className="ui padded segment"
          style={{ backgroundColor: "#45a29e" }}
        >
          <Grid columns={2} padded>
            <Grid.Column>
              <Link to="/">
                <Image
                  src={logoImg}
                  width="100"
                  length="100"
                  className="left floated"
                />
              </Link>
              <h1>The Daily Clawsmic</h1>
              {Auth.loggedIn() ? (
                <>
                  <Menu
                    pointing
                    secondary
                    size="large"
                    style={{ border: "none" }}
                  >
                    <Menu.Item
                      as={Link}
                      to="/APOD"
                      name="Pic of the Day"
                      style={{
                        color: currentPage === "/APOD" ? "#66fcf1" : "#564f6f",
                        borderBottom:
                          currentPage === "/APOD" ? "2px solid #66fcf1" : "",
                      }}
                    />
                    <Menu.Item
                      name="Mars Photos"
                      as={Link}
                      to="/mars"
                      style={{
                        color: currentPage === "/mars" ? "#66fcf1" : "#564f6f",
                        borderBottom:
                          currentPage === "/mars" ? "2px solid #66fcf1" : "",
                      }}
                    />
                    <Menu.Item
                      name="Space Articles"
                      as={Link}
                      to="/tech"
                      style={{
                        color: currentPage === "/tech" ? "#66fcf1" : "#564f6f",
                        borderBottom:
                          currentPage === "/tech" ? "2px solid #66fcf1" : "",
                      }}
                    />
                    <Menu.Item
                      name="Favorites"
                      as={Link}
                      to="/favorites"
                      style={{
                        color:
                          currentPage === "/favorites" ? "#66fcf1" : "#564f6f",
                        borderBottom:
                          currentPage === "/favorites"
                            ? "2px solid #66fcf1"
                            : "",
                      }}
                    />
                  </Menu>
                </>
              ) : (
                <>
                  <div></div>
                </>
              )}
            </Grid.Column>
            <Grid.Column verticalAlign="right" textAlign="middle">
              <Grid.Row></Grid.Row>
              <Grid.Row style={{}}>
                {Auth.loggedIn() ? (
                  <>
                    {/* <Link className="btn btn-lg btn-info m-2" to="/me" style={{ color: "white"}} >
                {Auth.getProfile().data.username}'s profile  
              </Link> */}
                    <Button
                      as={Link}
                      to="/me"
                      style={{ background: "#1f2833", color: "white" }}
                    >
                      {Auth.getProfile().data.username}'s profile
                    </Button>
                    <Button
                      style={{
                        background: "#1f2833",
                        color: "white",
                        marginLeft: "1em",
                      }}
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
        </div>
      </Segment>
    </div>
  );
};

export default Header;
