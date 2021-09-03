import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import { fetchTopMovies } from "../api/api";
import MovieCard from "./MovieCard";

const MovieTopPage = () => {
  const [topMovies, setTopMovies] = useState([]);

  const moviesTop = async () => {
    await fetchTopMovies().then((data) => {
      setTopMovies(data);
    });
  };

  useEffect(() => {
    moviesTop();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Image.Group>
        {topMovies &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </Image.Group>
    </div>
  );
};

export default MovieTopPage;
