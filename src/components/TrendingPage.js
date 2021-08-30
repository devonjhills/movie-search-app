import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import { fetchTrendingMoviesDay } from "../api/api";
import MovieCard from "./MovieCard";

const TrendingPage = () => {
  const [trending, setTrending] = useState([]);

  const getTrendingMoviesDay = async () => {
    await fetchTrendingMoviesDay().then((data) => {
      setTrending(data);
    });
  };

  useEffect(() => {
    getTrendingMoviesDay();
  }, []);

  const d = new Date();

  return (
    <div>
      <h1>Trending movies for {d.toDateString()}</h1>
      <Image.Group>
        {trending &&
          trending.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </Image.Group>
    </div>
  );
};

export default TrendingPage;
