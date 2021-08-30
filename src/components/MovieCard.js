import React, { useState } from "react";
import {
  Card,
  Dimmer,
  Header,
  Icon,
  Image,
  Modal,
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
          Average user rating
          <Rating
            size="tiny"
            className="myrating"
            disabled
            defaultRating={movie.vote_average}
            maxRating={10}
          />
        </Card.Content>
      </Card>
    </Modal>
  );
};

export default MovieCard;
