import React, { useEffect, useState } from "react";
import { Icon, Image, Message } from "semantic-ui-react";
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
    <div style={{ textAlign: "center" }}>
      {loading ? (
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>Just one second</Message.Header>
            We are fetching that content for you.
          </Message.Content>
        </Message>
      ) : (
        <Image.Group>
          {newMovies &&
            newMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </Image.Group>
      )}
    </div>
  );
};

export default MovieNewReleasesPage;
