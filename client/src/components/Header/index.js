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
    <div style={{ backgroundColor: "#1f2833" }}>
      <Segment basic>
        <div style={{ backgroundColor: "#1f2833" }}>
          {/* <header className="bg-primary text-light mb-4 py-3 flex-row align-center"> */}
          <header>
            <div>
              <div>
                <Link to="/">
                  <img
                    src={logoImg}
                    width="75"
                    length="75"
                    className="left floated"
                  />
                </Link>
              </div>
              <div>
                {Auth.loggedIn() ? (
                  <>
                    <Link className="btn btn-lg btn-info m-2" to="/me">
                      {Auth.getProfile().data.username}'s profile
                    </Link>
                    <button
                      className="btn btn-lg btn-light m-2"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="btn btn-lg btn-info m-2" to="/login">
                      Login
                    </Link>
                    <Link className="btn btn-lg btn-light m-2" to="/signup">
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </header>
        </div>
      </Segment>
    </div>
  );
};

export default Header;
