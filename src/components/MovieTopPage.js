import React, { useEffect, useState } from "react";
import { Container, Image } from "semantic-ui-react";
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
        <Image.Group>
          {newMovies &&
            newMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </Image.Group>
      </Container>
  );
};

export default MovieTopPage;
