import React from "react";
import { Image } from "semantic-ui-react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
      <div className= 'footer-stuff'>
      <p>© Devon Hills</p>
      </div>
        <div className="logo">
        Powered By
          <Image
            style={{marginLeft: '10px'}}
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            as="a"
            size="small"
            href="https://www.themoviedb.org/"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
