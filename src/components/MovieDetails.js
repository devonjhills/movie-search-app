import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "semantic-ui-react";
import { fetchMovieDetails } from "../api/api";

const MovieDetails = () => {
  const urlId = useParams();
  const movieId = urlId.id;

  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    const getMovieDetails = async () => {
      await fetchMovieDetails(movieId).then((data) => {
        setMovieDetails(data);
      });
    };

    getMovieDetails();
  }, [movieId]);

  const formatRuntime = (runtime) => {
    let hours = (runtime / 60).toFixed(0);
    let minutes = runtime % 60;

    return `${hours}h ${minutes}min`;
  };

  const d = new Date(`${movieDetails.release_date}`);

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Card.Header>{movieDetails.title}</Card.Header>
          <Card.Meta>
            {d.toDateString().split(" ").slice(1).join(" ")} •{" "}
            {formatRuntime(movieDetails.runtime)} •{" "}
            <span className="myrating">{movieDetails.rating}</span> 
          </Card.Meta>
          <Card.Description>{movieDetails.overview}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          Average user rating: {movieDetails.vote_average}
        </Card.Content>
      </Card>
    </div>
  );
};

export default MovieDetails;
