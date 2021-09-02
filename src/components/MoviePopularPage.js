import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import { fetchPopularMovies } from "../api/api";
import MovieCard from "./MovieCard";

const MoviePopularPage = () => {
  const [newMovies, setNewMovies] = useState([]);

  const moviePopular = async () => {
    await fetchPopularMovies().then((data) => {
      setNewMovies(data);
      console.log("RENDERING POPULAR")
    });
  };

  useEffect(() => {
    moviePopular();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Image.Group>
        {newMovies &&
          newMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </Image.Group>
    </div>
  );
};

export default MoviePopularPage;
