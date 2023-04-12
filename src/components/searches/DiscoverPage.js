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
import { discoverMedia } from "../../api/api";
import SearchResultsMovies from "./SearchResultsMovies";
import SearchResultsTV from "./SearchResultsTV";

const DiscoverPage = () => {
  const [matchingResults, setMatchingResults] = useState([]);
  const [keywordName, setKeywordName] = useState("");
  const [genreName, setGenreName] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [loading, setLoading] = useState(true);

  const { search } = useLocation();

  useEffect(() => {
    let isMounted = true;

    const params = new URLSearchParams(search);
    const id = params.get("id");
    const keywordString = params.get("keyword");
    const genreString = params.get("genre");
    const mediaString = params.get("media");

    const moviesByKeyword = async () => {
      await discoverMedia(id, genreString, keywordString, mediaString).then(
        (data) => {
          if (data === undefined) {
            console.log("fetch keyword results error");
          }
          if (isMounted) {
            setMatchingResults(data);
            setKeywordName(keywordString);
            setGenreName(genreString);
            setMediaType(mediaString);
            setLoading(false);
          }
        }
      );
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
          <Header attached="top" inverted>
            {`Other ${mediaType === "movie" ? "movies" : "shows"} with ${
              keywordName ? "keyword" : "genre"
            }`}
            <span className="mykeyword">{`${keywordName ?? genreName}`}</span>
          </Header>
          <Segment attached inverted>
            <div className="my-scroll">
              {matchingResults?.length > 0 ? (
                <Item.Group divided relaxed>
                  {matchingResults?.map((media) =>
                    mediaType === "movie" ? (
                      <SearchResultsMovies key={media.id} movie={media} />
                    ) : (
                      <SearchResultsTV key={media.id} show={media} />
                    )
                  )}
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
