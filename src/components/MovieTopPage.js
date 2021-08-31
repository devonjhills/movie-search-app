import React, { useEffect, useState } from "react";
import { Container, Header, Image } from "semantic-ui-react";
import { fetchTopMovies } from "../api/api";
import MovieCard from "./MovieCard";

const MovieTopPage = () => {
  const [newMovies, setNewMovies] = useState([]);

  const moviesTop = async () => {
    await fetchTopMovies().then((data) => {
      setNewMovies(data);
    });
  };

  useEffect(() => {
    moviesTop();
  }, []);

  return (
      <Container textAlign="center">
        {" "}
        <Header as="h1">Highest Rated Movies On TMDB</Header>
        <Image.Group size='small'>
          {newMovies &&
            newMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </Image.Group>
      </Container>
  );
};

export default MovieTopPage;
