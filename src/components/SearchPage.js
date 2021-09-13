import React, { useEffect, useState } from "react";
import { fetchSearchResults } from "../api/api";
import { useLocation } from "react-router";
import {
  Container,
  Dimmer,
  Item,
  Label,
  Loader,
  Menu,
  Tab,
} from "semantic-ui-react";
import SearchResultsMovies from "./SearchResultsMovies";
import SearchResultsTV from "./SearchResultsTV";
import SearchResultsPeople from "./SearchResultsPeople";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [queryResults, setQueryReults] = useState([]);

  const { search } = useLocation();

  useEffect(() => {
    //https://stackoverflow.com/questions/53949393/
    //cant-perform-a-react-state-update-on-an-unmounted-component
    let isMounted = true;

    const params = new URLSearchParams(search);
    const query = params.get("query");

    const handleSearch = async () => {
      await fetchSearchResults(query).then((data) => {
        if (data === undefined) {
          console.log("fetch search results error");
        }
        if (isMounted) {
          setQueryReults(data);
          setLoading(false);
        }
      });
    };

    handleSearch();
    return () => {
      isMounted = false;
    };
  }, [search]);

  const panes = [
    {
      menuItem: (
        <Menu.Item key="movies">
          Movies<Label>{queryResults?.movieResults?.length}</Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          {queryResults?.movieResults?.length > 0 ? (
            <Item.Group divided relaxed>
              {queryResults?.movieResults?.map((movie) => (
                <SearchResultsMovies key={movie.id} movie={movie} />
              ))}
            </Item.Group>
          ) : (
            <p>No Results</p>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="tv">
          Television<Label>{queryResults?.tvResults?.length}</Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          {queryResults?.tvResults?.length > 0 ? (
            <Item.Group divided relaxed>
              {queryResults?.tvResults?.map((show) => (
                <SearchResultsTV key={show.id} show={show} />
              ))}
            </Item.Group>
          ) : (
            <p>No Results</p>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="people">
          People<Label>{queryResults?.peopleResults?.length}</Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          {queryResults?.peopleResults?.length > 0 ? (
            <Item.Group divided relaxed>
              {queryResults?.peopleResults?.map((person) => (
                <SearchResultsPeople key={person.id} person={person} />
              ))}
            </Item.Group>
          ) : (
            <p>No Results</p>
          )}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <Container>
          <Dimmer active>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        </Container>
      ) : (
        <Container>
          <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition="left"
            panes={panes}
          />
        </Container>
      )}
    </div>
  );
};

export default SearchPage;
