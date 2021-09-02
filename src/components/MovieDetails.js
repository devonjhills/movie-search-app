import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Icon, Message } from "semantic-ui-react";
import { fetchMovieDetails } from "../api/api";

const MovieDetails = () => {
  const urlId = useParams();
  const movieId = urlId.id;

  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      await fetchMovieDetails(movieId).then((data) => {
        setMovieDetails(data);
        setLoading(false);
        console.log("RENDERING MOVIE DETAILS")
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
    <Container>
      {loading ? (
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>Just one second</Message.Header>
            We are fetching that content for you.
          </Message.Content>
        </Message>
      ) : (
        <Card fluid>
          <Card.Content>
            <Card.Header>{movieDetails.title}</Card.Header>
            <Card.Meta>
              {d.toDateString().split(" ").slice(1).join(" ")} •{" "}
              {formatRuntime(movieDetails.runtime)} •{" "}
              <span className="myrating">
                {movieDetails.rating ? movieDetails.rating : "NR"}
              </span>
            </Card.Meta>
            <Card.Description>{movieDetails.overview}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            Average user rating: {movieDetails.vote_average}
          </Card.Content>
        </Card>
      )}
    </Container>
  );
};

export default MovieDetails;
