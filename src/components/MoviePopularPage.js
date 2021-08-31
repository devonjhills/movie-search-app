import React, { useEffect, useState } from "react";
import { Container, Header, Image } from "semantic-ui-react";
import { fetchPopularMovies } from "../api/api";
import MovieCard from "./MovieCard";

const MoviePopularPage = () => {
  const [newMovies, setNewMovies] = useState([]);

  const moviePopular = async () => {
    await fetchPopularMovies().then((data) => {
      setNewMovies(data);
    });
  };

  useEffect(() => {
    moviePopular();
  }, []);

  return (
      <Container textAlign="center">
        {" "}
        <Header as="h1">Most Popular Movies on </Header>
        <Image.Group>
          {newMovies &&
            newMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </Image.Group>
      </Container>
  );
};

export default MoviePopularPage;
