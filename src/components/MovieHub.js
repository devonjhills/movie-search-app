import { useEffect, useState } from "react";
import { Container, Dimmer, Item, Loader, Tab } from "semantic-ui-react";
import {
  fetchNewMovieReleases,
  fetchPopularMovies,
  fetchTopMovies,
} from "../api/api";
import SearchResultsMovies from "./SearchResultsMovies";

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

  const panes = [
    {
      menuItem: { key: 'new', icon: 'calendar check outline', content: 'New Releases' },
      pane: (
        <Tab.Pane key='new-pane'>
          <div className="my-scroll">
            <Item.Group divided relaxed>
              {newMovies.map((movie) => (
                <SearchResultsMovies key={movie.id} movie={movie} />
              ))}
            </Item.Group>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'popular', icon: 'fire', content: 'Popular Today' },
      pane: (
        <Tab.Pane key='popular-pane'>
          <div className="my-scroll">
            <Item.Group divided relaxed>
              {popularMovies.map((movie) => (
                <SearchResultsMovies key={movie.id} movie={movie} />
              ))}
            </Item.Group>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'top', icon: 'star outline', content: 'Top Rated' },
      pane: (
        <Tab.Pane key='top-pane'>
          <div className="my-scroll">
            <Item.Group divided relaxed>
              {topMovies.map((movie) => (
                <SearchResultsMovies key={movie.id} movie={movie} />
              ))}
            </Item.Group>
          </div>
        </Tab.Pane>
      ),
    },
  ];

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
          <Tab panes={panes} renderActiveOnly={false} />
        </Container>
      )}
    </>
  );
};

export default MovieHub;
