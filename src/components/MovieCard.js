import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import {
  Button,
  Dimmer,
  Divider,
  Header,
  Image,
} from "semantic-ui-react";

const MovieCard = ({ movie }) => {
  const [active, setActive] = useState(false);
  const handleShow = () => setActive(true);
  const handleHide = () => setActive(false);

  const [redirect, setRedirect] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setRedirect(true);
  };

  const { pathname } = useLocation();

  if (redirect === true) {
    return <Redirect pathname={pathname} push to={`/${movie.id}`} />;
  }

  const d = new Date(`${movie.release_date}`);

  const content = (
    <div>
      <Header as="h3" inverted>
        {movie.title}
        <Header.Subheader>
          {d.toDateString().split(" ").slice(1).join(" ")}
        </Header.Subheader>
      </Header>

      <Divider hidden />

      <Button compact circular inverted>
        <Button.Content>Click for full details</Button.Content>
      </Button>
    </div>
  );

  return (
    <Dimmer.Dimmable
      as={Image}
      className="mydimmer"
      dimmed={active}
      dimmer={{ active, content }}
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      onClick={handleClick}
      src={movie.poster}
    />
  );
};

export default MovieCard;
