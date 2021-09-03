import React, { useEffect, useState } from "react";
import { Dimmer, Image, Loader } from "semantic-ui-react";
import { fetchNewMovieReleases } from "../api/api";
import MovieCard from "./MovieCard";

const MovieNewReleasesPage = () => {
  const [newMovies, setNewMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const movieNewReleases = async () => {
    await fetchNewMovieReleases().then((data) => {
      setNewMovies(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    movieNewReleases();
  }, []);

  return (
    <>
      {loading ? (
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      ) : (
        <Image.Group>
          {newMovies &&
            newMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </Image.Group>
      )}
    </>
  );
};

export default MovieNewReleasesPage;
