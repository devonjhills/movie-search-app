import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Image,
  Label,
  Message,
  Modal,
  Popup,
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

  const content = (
    <div>
      <Header as="h4" icon inverted>
        <Icon name="hand point up outline" />
        Click for more info
      </Header>
    </div>
  );

  const d = new Date(`${movie.release_date}`);

  return (
    <Modal
      basic
      closeIcon
      trigger={
        <Dimmer.Dimmable
          as={Image}
          className="mydimmer"
          dimmed={active}
          dimmer={{ active, content }}
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
          src={movie.poster}
        />
      }>
      <Header>{movie.title}</Header>
      <Modal.Content image>
        <Image src={movie.backdrop} />
        <Modal.Description>
          <p>
            {movie.overview ? (
              movie.overview
            ) : (
              <Message
                color="black"
                error
                icon="ban"
                header="No synopsis found for this movie"
              />
            )}
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Header inverted floated="left" className="modalheader">
          {d.toDateString().split(" ").slice(1).join(" ")}
          <Popup
            trigger={
              <Label basic circular horizontal size="large">
                <Icon name="star" color="yellow" />
                {movie.vote_average}
              </Label>
            }
            content={`${movie.vote_count.toLocaleString("en-US")} ratings`}
            inverted
          />
        </Header>
        <Button
          inverted
          content="Full movie details"
          icon="right arrow"
          labelPosition="right"
          onClick={handleClick}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default MovieCard;
