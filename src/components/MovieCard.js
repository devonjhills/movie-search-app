import React from "react";
import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import { posterCardUrl } from "../api/constants";

const MovieCard = ({ movie }) => {

  return (
    <Link to={`/${movie.id}`}>
      <div className="moviecard">
        {movie.poster_path !== null ? (
          <Image src={posterCardUrl + movie.poster_path} />
        ) : (
          <div className="no-user">
            <Icon size="massive" name="image outline" color="black" />
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
