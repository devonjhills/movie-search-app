import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Image,
  Modal,
  Popup,
  Rating,
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
      <Header as="h4" icon inverted color="green">
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
          className='mydimmer'
          dimmed={active}
          dimmer={{ active, content }}
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
          src={movie.poster}
        />
      }
    >
      <Header>{movie.title}</Header>
      <Modal.Content image>
        <Image src={movie.backdrop} />
        <Modal.Description>
          <Header inverted>
            {d.toDateString().split(" ").slice(1).join(" ")}
            <Popup
              trigger={
                <Rating
                  className="mystars"
                  icon="star"
                  disabled
                  defaultRating={movie.vote_average}
                  maxRating={10}
                />
              }
              content={`Average user rating: ${movie.vote_average}`}
              inverted
            />
          </Header>
          <p>{movie.overview}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          inverted
          color="green"
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
