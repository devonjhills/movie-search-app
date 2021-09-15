import React, { useEffect, useState } from "react";
import { Container, Dimmer, Item, Loader, Tab } from "semantic-ui-react";
import { fetchNewTv, fetchPopularTv, fetchTopTv } from "../api/api";
import SearchResultsTV from "./SearchResultsTV";

const TvHub = () => {

  const [newShows, setNewShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [topShows, setTopShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const tvOnAir = async () => {
    await fetchNewTv().then((data) => {
      setNewShows(data);
      setLoading(false);
    });
  };

  const tvPopular = async () => {
    await fetchPopularTv().then((data) => {
      setPopularShows(data);
    });
  };

  const tvTop = async () => {
    await fetchTopTv().then((data) => {
      setTopShows(data);
    });
  };

  useEffect(() => {
    tvOnAir();
    tvPopular();
    tvTop();
  }, []);

  const panes = [
    {
      menuItem: { key: 'new-tv', icon: 'calendar check outline', content: 'On The Air' },
      pane: (
        <Tab.Pane key='new-pane-tv'>
          <div className="my-scroll">
            <Item.Group divided relaxed>
              {newShows.map((show) => (
                <SearchResultsTV key={show.id} show={show} />
              ))}
            </Item.Group>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'popular-tv', icon: 'fire', content: 'Popular Today' },
      pane: (
        <Tab.Pane key='popular-pane-tv'>
          <div className="my-scroll">
            <Item.Group divided relaxed>
              {popularShows.map((show) => (
                <SearchResultsTV key={show.id} show={show} />
              ))}
            </Item.Group>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'top-tv', icon: 'star outline', content: 'Top Rated' },
      pane: (
        <Tab.Pane key='top-pane-tv'>
          <div className="my-scroll">
            <Item.Group divided relaxed>
              {topShows.map((show) => (
                <SearchResultsTV key={show.id} show={show} />
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

export default TvHub;
