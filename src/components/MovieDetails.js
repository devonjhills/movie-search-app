import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Embed,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Loader,
  Modal,
  Segment,
} from "semantic-ui-react";
import { fetchMovieDetails, formatResults } from "../api/api";
import { imageUrl, largeImageUrl } from "../api/constants";
import {
  getMovieDirectors,
  getMovieRating,
  getMovieTrailer,
  getMovieWriters,
} from "../api/helpers";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import ScrollToTop from "./ScrollToTop";
import SocialButtons from "./SocialButtons";

const MovieDetails = () => {
  const urlId = useParams();
  const movieId = urlId.movieId;

  const [movieDetails, setMovieDetails] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [rating, setRating] = useState("");
  const [trailer, setTrailer] = useState("");
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    //https://stackoverflow.com/questions/53949393/
    //cant-perform-a-react-state-update-on-an-unmounted-component
    let isMounted = true;

    const getMovieDetails = async () => {
      await fetchMovieDetails(movieId).then((data) => {
        if (data === undefined) {
          console.log("UNDEFINED MOVIE DATA");
          setNoData(true);
        }

        if (isMounted) {
          setMovieDetails(data);
          setDirectors(getMovieDirectors(data));
          setWriters(getMovieWriters(data));
          setRating(getMovieRating(data));
          setTrailer(getMovieTrailer(data));
          setLoading(false);
        }
      });
    };

    getMovieDetails();
    return () => {
      isMounted = false;
    };
  }, [movieId]);

  const keywords = movieDetails?.keywords?.keywords;

  const recommended =
    movieDetails?.recommendations?.results &&
    movieDetails.recommendations.results.map((movie) => {
      return formatResults(movie);
    });

  const topCastList =
    movieDetails?.credits &&
    movieDetails?.credits.cast
      .slice(0, 10)
      .map((person) => <PersonCard key={person.id} person={person} />);

  const recommendedList = recommended?.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  const MovieBanner = () => {
    const formatRuntime = (runtime) => {
      let hours = (runtime / 60).toFixed(0);
      let minutes = runtime % 60;

      return `${hours}h ${minutes}min`;
    };

    const d = new Date(`${movieDetails.release_date}`);

    const directorList =
      directors &&
      directors.map((d) => (
        <List.Item key={d.id} as={Link} to={`/person/${d.id}`}>
          {d.name}
        </List.Item>
      ));

    const writerList =
      writers &&
      writers.map((w) => (
        <List.Item key={w.id} as={Link} to={`/person/${w.id}`}>
          {`${w.name} (${w.job})`}
        </List.Item>
      ));

    return (
      <Grid.Row>
        <Grid.Column width={5}>
          {movieDetails.poster_path ? (
            <Image src={imageUrl + movieDetails.poster_path} />
          ) : (
            <div className="no-search-image">
              <Icon size="massive" name="image outline" color="grey" />
            </div>
          )}
        </Grid.Column>

        <Grid.Column width={11}>
          <Header as="h1" inverted>
            <span className="mygradient">{movieDetails.title}</span>
            <Header.Subheader style={{ marginTop: "5px" }}>
              {d.toDateString().split(" ").slice(1).join(" ")} {" • "}
              {formatRuntime(movieDetails.runtime)}
              {" • "}
              <span className="myrating">{rating ? rating : "NR"}</span>
              {" • "}
              {movieDetails.genres &&
                movieDetails.genres.map((genre) => {
                  return (
                    <Button
                      basic
                      inverted
                      color="green"
                      size="mini"
                      key={genre.id}
                      compact
                      circular>
                      {genre.name}
                    </Button>
                  );
                })}
            </Header.Subheader>
          </Header>

          <Header inverted as="h4" style={{ fontStyle: "italic" }}>
            {movieDetails.tagline}
          </Header>

          {movieDetails.overview ? (
            <p>{movieDetails.overview}</p>
          ) : (
            <p>~~No synopsis found for this movie~~</p>
          )}

          <List inverted relaxed size="large">
            <List.Item>
              <List.Icon inverted name="video" />
              <List.Content>
                <List.Header>
                  {directors?.length > 1 ? "Directors" : "Director"}
                </List.Header>
                <List.Description>
                  <List horizontal divided>
                    {directorList}
                  </List>
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon inverted name="pencil" />
              <List.Content>
                <List.Header>
                  {writers?.length > 1 ? "Writers" : "Writer"}
                </List.Header>
                <List.Description>
                  <List horizontal divided>
                    {writerList}
                  </List>
                </List.Description>
              </List.Content>
            </List.Item>
          </List>

          <Divider hidden />

          <Modal
            basic
            size="large"
            trigger={
              trailer !== undefined && (
                <Button
                  basic
                  style={{ borderRadius: "9999px" }}
                  inverted
                  color="green">
                  <Icon name="play" />
                  {movieDetails.title} Trailer
                </Button>
              )
            }>
            <Modal.Content>
              <Embed
                id={trailer}
                source="youtube"
                active
                iframe={{
                  allowFullScreen: true,
                }}
              />
            </Modal.Content>
          </Modal>
        </Grid.Column>
      </Grid.Row>
    );
  };

  const SidebarDetails = () => {
    return (
      <List size="big" inverted relaxed divided>
        <List.Item>
          <List.Content>
            <List.Header>
              <Icon name="star" color="yellow" />
              {movieDetails.vote_average} /10
            </List.Header>
            <List.Description>
              {movieDetails.vote_count.toLocaleString("en-US")} Ratings
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Budget</List.Header>
            <List.Description>
              {movieDetails.budget === 0
                ? "---"
                : movieDetails.budget.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Revenue</List.Header>
            <List.Description>
              {movieDetails.revenue === 0
                ? "---"
                : movieDetails.revenue.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Status</List.Header>
            <List.Description>{movieDetails.status}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <SocialButtons
            externals={movieDetails.external_ids}
            homepage={movieDetails.homepage}
          />
        </List.Item>
      </List>
    );
  };

  return (
    <>
      <ScrollToTop />
      {loading ? (
        <Container>
          <Dimmer active>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        </Container>
      ) : noData ? (
        <Header>NO MOVIE FOUND</Header>
      ) : (
        <>
          <div
            style={{
              background: `linear-gradient(to right, rgb(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)),
              url(${
                largeImageUrl + movieDetails.backdrop_path
              }) no-repeat center/cover`,
              position: "relative",
              width: "100vw",
            }}>
            <Container>
              <Grid verticalAlign="middle" stackable relaxed padded>
                <MovieBanner />
              </Grid>
            </Container>
          </div>

          <Divider hidden />

          <Container>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Segment basic>
                    <SidebarDetails />
                  </Segment>
                </Grid.Column>
                <Grid.Column width={13}>
                  {topCastList.length !== 0 && (
                    <Segment basic>
                      <Header inverted>
                        <span className="mygradient"> Top Cast </span>
                      </Header>
                      <div className="scroll-container">
                        <ScrollMenu>{topCastList}</ScrollMenu>
                      </div>
                    </Segment>
                  )}
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={3}>
                  {keywords.length !== 0 && (
                    <Segment basic>
                      <Header inverted>
                        <span className="mygradient">Keywords</span>
                      </Header>
                      <Button.Group vertical>
                        {keywords.slice(0, 9).map((keyword) => {
                          return (
                            <Button
                              style={{ marginBottom: "1px" }}
                              basic
                              inverted
                              color="green"
                              key={keyword.id}
                              compact>
                              {keyword.name}
                            </Button>
                          );
                        })}
                      </Button.Group>
                    </Segment>
                  )}
                </Grid.Column>

                <Grid.Column width={13}>
                  {recommended.length !== 0 && (
                    <Segment basic>
                      <>
                        <Header inverted>
                          <span className="mygradient">Recommended</span>
                        </Header>
                        <div className="scroll-container">
                          <ScrollMenu>{recommendedList}</ScrollMenu>
                        </div>
                      </>
                    </Segment>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default MovieDetails;
