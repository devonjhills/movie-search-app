import { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import {
  Container,
  Dimmer,
  Grid,
  Header,
  Loader,
  Segment,
} from "semantic-ui-react";
import {
  fetchNewMovieReleases,
  fetchPopularMovies,
  fetchTopMovies,
} from "../api/api";
import MovieCard from "./MovieCard";

const MovieHub = () => {
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const movieNewReleases = async () => {
    await fetchNewMovieReleases().then((data) => {
      setNewMovies(data);
      setLoading(false);
    });
  };

  const moviePopular = async () => {
    await fetchPopularMovies().then((data) => {
      setPopularMovies(data);
    });
  };

  const moviesTop = async () => {
    await fetchTopMovies().then((data) => {
      setTopMovies(data);
    });
  };

  useEffect(() => {
    movieNewReleases();
    moviePopular();
    moviesTop();
  }, []);

  return (
    <>
      {loading ? (
        <Container>
          <Dimmer active>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        </Container>
      ) : (
        <Container>
          <Grid stackable relaxed>
            <Grid.Row>
              <Grid.Column width={16}>
                <Segment inverted>
                  <Header className="body-headers" color="green" inverted>
                    New Releases
                  </Header>
                  <div className="scroll-container">
                    <ScrollMenu>
                      {newMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </ScrollMenu>
                  </div>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16}>
                <Segment inverted>
                  <Header className="body-headers" color="green" inverted>
                    Today's Popular Movies
                  </Header>
                  <div className="scroll-container">
                    <ScrollMenu>
                      {popularMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </ScrollMenu>
                  </div>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16}>
                <Segment inverted>
                  <Header className="body-headers" color="green" inverted>
                    Top Rated
                  </Header>
                  <div className="scroll-container">
                    <ScrollMenu>
                      {topMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </ScrollMenu>
                  </div>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default MovieHub;
