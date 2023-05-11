import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Grid, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import logoImg from "../../assets/catlogo.png";

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Grid columns={2} padded style={{ backgroundColor: "#45a29e" }}>
      <Grid.Column>
        <Link to="/">
          <img
            src={logoImg}
            width="100"
            length="100"
            className="left floated"
          />
        </Link>
      </Grid.Column>
      <Grid.Column verticalAlign="middle">
        {Auth.loggedIn() ? (
          <>
            <Link className="btn btn-lg btn-info m-2" to="/me">
              {Auth.getProfile().data.username}'s profile
            </Link>
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-lg btn-info m-2" to="/login">
              <button>Login</button>
            </Link>
            <Link className="btn btn-lg btn-light m-2" to="/signup">
              <button>Signup</button>
            </Link>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Header;
