import React, { useEffect, useState } from "react";
import { fetchSearchResults } from "../api/api";
import { useLocation } from "react-router";
import { Container, Dimmer, Loader } from "semantic-ui-react";

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

  console.dir(queryResults);

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
        <p>{queryResults.movieResults.length}</p>
        <p>{queryResults.tvResults.length}</p>
        <p>{queryResults.peopleResults.length}</p>
        </Container>
      )}
    </div>
  );
};

export default SearchPage;
