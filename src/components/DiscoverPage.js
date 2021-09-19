import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  Container,
  Dimmer,
  Header,
  Item,
  Loader,
  Segment,
} from "semantic-ui-react";
import { discoverMovies } from "../api/api";
import SearchResultsMovies from "./SearchResultsMovies";

const DiscoverPage = () => {
  const [keywordMovies, setKeywordMovies] = useState([]);
  const [keywordName, setKeywordName] = useState("");
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(true);

  const { search } = useLocation();

  useEffect(() => {
    let isMounted = true;

    const params = new URLSearchParams(search);
    const id = params.get("id");
    const keywordString = params.get("keyword");
    const genreString = params.get("genre");
    
    const moviesByKeyword = async () => {
      await discoverMovies(id, genreString, keywordString).then((data) => {
        if (data === undefined) {
          console.log("fetch keyword results error");
        }
        if (isMounted) {
          setKeywordMovies(data);
          setKeywordName(keywordString);
          setGenreName(genreString);
          setLoading(false);
        }
      });
    };

    moviesByKeyword();

    return () => {
      isMounted = false;
    };
  }, [search]);

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
          <Header size="large" inverted attached="top">
            {`Other movies with ${keywordName ? 'keyword' : 'genre'}`}
            <span className="mykeyword">{`${keywordName ?? genreName}`}</span>
          </Header>
          <Segment inverted attached>
            <div className="my-scroll">
              {keywordMovies?.length > 0 ? (
                <Item.Group divided relaxed>
                  {keywordMovies?.map((movie) => (
                    <SearchResultsMovies key={movie.id} movie={movie} />
                  ))}
                </Item.Group>
              ) : (
                <p>No Results</p>
              )}
            </div>
          </Segment>
        </Container>
      )}
    </>
  );
};

export default DiscoverPage;
