import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

const FourOhFour = () => {

  console.log("ON 404 PAGE?")

  return (
    <Container>
      <p>404 - PAGE NOT FOUND</p>
      <Link to="/">Back</Link>
    
    </Container>
  );
};

export default FourOhFour;
