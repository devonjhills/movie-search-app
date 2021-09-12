import React from "react";
import { Link } from "react-router-dom";
import { Header, Icon, Image, Label, Popup } from "semantic-ui-react";

const MovieCard = ({ movie }) => {
  const d = new Date(`${movie.release_date}`);

  const content = (
    <div>
      <Header as="h4" inverted>
        {movie.title}
        <Header.Subheader>
          {d.toDateString().split(" ").slice(1).join(" ")}
        </Header.Subheader>
      </Header>
      <Label>
        <Icon name="star" color="yellow" /> {movie.vote_average}
      </Label>
    </div>
  );

  return (
    <Popup
      trigger={
        <Link to={`/${movie.id}`}>
          <div className="mydimmer">
            <Image src={movie.poster} />
          </div>
        </Link>
      }
      content={content}
      inverted
      position="top center"
    />
  );
};

export default MovieCard;
