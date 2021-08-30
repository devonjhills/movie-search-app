import React from "react";
import { Card, Image, Modal, Rating } from "semantic-ui-react";

const MovieCard = ({ movie }) => {
  const d = new Date(`${movie.release_date}`);

  return (
    <Modal
      basic
      closeIcon
      size="tiny"
      trigger={<Image bordered className="poster" src={movie.poster} />}
    >
      <Card fluid color='green'>
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
            icon='star'
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
