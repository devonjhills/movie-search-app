import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Header, Icon, Image, Label, Popup } from "semantic-ui-react";

const MovieCard = ({ movie }) => {
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

  const style = {
    borderRadius: "25px",
    backgroundColor: "black",
  };

  return (
    <Popup
      trigger={
        <div className="mydimmer" onClick={handleClick}>
          <Image src={movie.poster} />
        </div>
      }
      inverted
      basic
      content={content}
      style={style}
      position="top center"
    />
  );
};

export default MovieCard;
