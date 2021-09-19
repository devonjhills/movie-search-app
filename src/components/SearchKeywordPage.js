import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container, Dimmer, Item, Loader } from "semantic-ui-react";
import { discoverMovies } from "../api/api";
import SearchResultsMovies from "./SearchResultsMovies";

const SearchKeywordPage = () => {
  const [keywordMovies, setKeywordMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { search } = useLocation();

  useEffect(() => {
    let isMounted = true;
    const params = new URLSearchParams(search);
    const query = params.get("query");

    const moviesByKeyword = async () => {
      await discoverMovies(query).then((data) => {
        if (data === undefined) {
          console.log("fetch keyword results error");
        }
        if (isMounted) {
          setKeywordMovies(data);
          setLoading(false);
        }
      });
    };

    moviesByKeyword();

    return () => {
      isMounted = false;
    };
  }, [search]);

  console.log(keywordMovies);

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
        </Container>
      )}
    </>
  );
};

export default SearchKeywordPage;
