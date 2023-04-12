import React, { useEffect, useState } from "react";
import { fetchSearchResults } from "../../api/api";
import { useLocation } from "react-router";
import {
  Container,
  Dimmer,
  Header,
  Item,
  Label,
  Loader,
  Menu,
  Segment,
  Tab,
} from "semantic-ui-react";
import SearchResultsMovies from "./SearchResultsMovies";
import SearchResultsTV from "./SearchResultsTV";
import SearchResultsPeople from "./SearchResultsPeople";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [queryResults, setQueryReults] = useState([]);
  const [query, setQuery] = useState("");

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
          setQuery(query);
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
        <div className="my-scroll">
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
        </div>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="tv">
          Television<Label>{queryResults?.tvResults?.length}</Label>
        </Menu.Item>
      ),
      render: () => (
        <div className="my-scroll">
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
        </div>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="people">
          People<Label>{queryResults?.peopleResults?.length}</Label>
        </Menu.Item>
      ),
      render: () => (
        <div className="my-scroll">
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
        </div>
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
          <Header attached inverted>
            Search results for: <span className="mykeyword">{query}</span>
          </Header>
          <Segment attached inverted>
          <Tab panes={panes} />
          </Segment>

        </Container>
      )}
    </div>
  );
};

export default SearchPage;
