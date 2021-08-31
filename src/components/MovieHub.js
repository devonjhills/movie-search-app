import React, { useState } from "react";
import { Grid, Icon, Menu, Tab } from "semantic-ui-react";
import MovieNewReleasesPage from "./MovieNewReleasesPage";

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
        key: "trending",
        icon: "fire",
        content: "Trending Movies",
      },
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
    {
      menuItem: {
        key: "popular",
        icon: "star",
        content: "Popular Movies",
      },
      render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
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
      menu={{ fluid: true, vertical: true }}
      panes={panes}
      defaultActiveIndex={0}
    />
  );
};

export default MovieHub;
