import React, { useEffect, useState } from "react";
import { Container, Header, Image } from "semantic-ui-react";
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
    <div>
      <Header as="h1" textAlign="center">
        In Theaters Now
      </Header>
      <Container textAlign="center">
        {" "}
        <Image.Group>
          {newMovies &&
            newMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </Image.Group>
      </Container>
    </div>
  );
};

export default MovieNewReleasesPage;
