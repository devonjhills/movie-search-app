import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  console.log(movieDetails);

  return <div>MOVIE DETAILS</div>;
};

export default MovieDetails;
