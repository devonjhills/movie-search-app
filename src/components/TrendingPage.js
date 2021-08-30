import React, { useEffect, useState } from "react";
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

  console.log(trending);

  const d = new Date();

  return (
    <div>
        Trending movies for {d.toDateString()}
      {trending && trending.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default TrendingPage;
