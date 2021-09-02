import { Container, Tab } from "semantic-ui-react";
import MovieNewReleasesPage from "./MovieNewReleasesPage";
import MoviePopularPage from "./MoviePopularPage";
import MovieTopPage from "./MovieTopPage";

const MovieHub = () => {
  const panes = [
    {
      menuItem: {
        key: "nowplaying",
        icon: "calendar alternate outline",
        content: "Now Playing",
      },
      pane: {
        key: 'new_pane',
        content: <MovieNewReleasesPage />,
      }
    },
    {
      menuItem: {
        key: "top",
        icon: "star",
        content: "Top Rated Movies",
      },
      pane: {
        key: 'top_pane',
        content: <MovieTopPage />,
      }
    },
    {
      menuItem: {
        key: "popular",
        icon: "heart outline",
        content: "Popular Movies",
      },
      pane: {
        key: 'popular_pane',
        content: <MoviePopularPage />,
      }
    },
    {
      menuItem: {
        key: "search",
        icon: "search",
        content: "Search",
      },
      pane: {
        key: 'search_pane',
        content: 'SEARCH PAGE UNDER CONSTRUCTION',
      }
    },
  ];

  return (
    <Container>
      <Tab
        menu={{ inverted: true, secondary: true, pointing: true  }}
        panes={panes}
        defaultActiveIndex={0}
        renderActiveOnly={false}
      />
    </Container>
  );
};

export default MovieHub;
