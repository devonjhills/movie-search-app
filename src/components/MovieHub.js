import { Tab } from "semantic-ui-react";
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
      render: () => (
        <Tab.Pane>
          <MovieNewReleasesPage />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: "top",
        icon: "star",
        content: "Top Rated Movies",
      },
      render: () => (
        <Tab.Pane>
          <MovieTopPage />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: "popular",
        icon: "heart outline",
        content: "Popular Movies",
      },
      render: () => (
        <Tab.Pane>
          <MoviePopularPage />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: "search",
        icon: "search",
        content: "Search",
      },
      render: () => <Tab.Pane>Tab 4 Content</Tab.Pane>,
    },
  ];

  return (
    <Tab
      panes={panes}
      defaultActiveIndex={0}
    />
  );
};

export default MovieHub;
