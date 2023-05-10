import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Segment, Grid, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: '#000000 !important' }}>
      <Segment basic>
      <div style={{ backgroundColor: '#000000 !important' }}>
        <footer>
          <div>
            {location.pathname !== '/' && (
              <button
                onClick={() => navigate(-1)}
              >
                &larr; Go Back
              </button>
            )}
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
        </footer>
        </div>
      </Segment>
    </div>
  );
};

export default Footer;
