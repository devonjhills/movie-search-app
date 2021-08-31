import React, { useEffect, useState } from "react";
import { Container, Header, Image } from "semantic-ui-react";
import { fetchNewMovieReleases } from "../api/api";
import MovieCard from "./MovieCard";

const MovieNewReleasesPage = () => {
  const [newMovies, setNewMovies] = useState([]);

  const movieNewReleases = async () => {
    await fetchNewMovieReleases().then((data) => {
      setNewMovies(data);
    });
  };

  useEffect(() => {
    movieNewReleases();
  }, []);

  return (
      <Container textAlign="center">
        {" "}
        <Header as="h1">Currently In Theaters</Header>
        <Image.Group size='small'>
          {newMovies &&
            newMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </Image.Group>
      </Container>
  );
};

export default MovieNewReleasesPage;
