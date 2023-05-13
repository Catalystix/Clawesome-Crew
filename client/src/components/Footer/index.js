import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: '#1f2833' }}>
      <Segment basic >
      <div className="ui padded segment" style={{ backgroundColor: '#1f2833' }}>
        <footer>
          <div style={{ textAlign: "right" }}> 
            {location.pathname !== '/' && (
          <Button inverted color='teal' className="ui very padded"
                onClick={() => navigate(-1)}
              >
                &larr; Go Back
              </Button>
            )}
          <div style={{ textAlign: "center" }}>
            <h4>
              Made with{' '}
              <span
                className="emoji"
                role="img"
                aria-label="heart"
                aria-hidden="false"
              >
                ❤️
              </span>{' '}
              by the Cats.
            </h4>
          </div>
          </div>
        </footer>
        </div>
      </Segment>
    </div>
  );
};

export default Footer;
