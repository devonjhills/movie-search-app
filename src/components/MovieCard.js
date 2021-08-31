import React, { useState } from "react";
import {
  Button,
  Card,
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

  const content = (
    <div>
      <Header as="h3" icon inverted color="green">
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
      size="tiny"
      trigger={
        <Dimmer.Dimmable
          as={Image}
          size="medium"
          dimmed={active}
          dimmer={{ active, content }}
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
          src={movie.poster}
        />
      }
    >
      <Card fluid color="green">
        <Image src={movie.backdrop} />
        <Card.Content>
          <Card.Header>{movie.title}</Card.Header>
          <Card.Meta>
            {d.toDateString().split(" ").slice(1).join(" ")}
          </Card.Meta>
          <Card.Description>{movie.overview}</Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="right">
          <Popup
            trigger={
              <Rating
                size="tiny"
                icon="heart"
                className="myrating"
                disabled
                defaultRating={movie.vote_average}
                maxRating={10}
              />
            }
            content={`Average user rating: ${movie.vote_average}`}
            inverted
          />
          <Button
            inverted
            color="green"
            content="Full movie details"
            icon="right arrow"
            labelPosition="right"
          />
        </Card.Content>
      </Card>
    </Modal>
  );
};

export default MovieCard;
