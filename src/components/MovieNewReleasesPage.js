import React, { useEffect, useState } from "react";
import { Icon, Image, Message } from "semantic-ui-react";
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
    <div style={{ textAlign: "center" }}>
      {newMovies ? (
        <Image.Group>
          {newMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Image.Group>
      ) : (
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>Just one second</Message.Header>
            We are fetching that content for you.
          </Message.Content>
        </Message>
      )}
    </div>
  );
};

export default MovieNewReleasesPage;
