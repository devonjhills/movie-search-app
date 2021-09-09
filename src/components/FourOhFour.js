import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

const FourOhFour = () => {

  return (
    <Container>
      <p>404 - PAGE NOT FOUND</p>
      <Link to="/">Back</Link>
    
    </Container>
  );
};

export default FourOhFour;
