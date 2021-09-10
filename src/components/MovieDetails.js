import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useParams } from "react-router-dom";
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
} from "semantic-ui-react";
import { fetchMovieDetails, formatResults } from "../api/api";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import ScrollToTop from "./ScrollToTop";
import SocialButtons from "./SocialButtons";

const MovieDetails = () => {
  const urlId = useParams();
  const movieId = urlId.movieId;

  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //https://stackoverflow.com/questions/53949393/
    //cant-perform-a-react-state-update-on-an-unmounted-component
    let isMounted = true;

    const getMovieDetails = async () => {
      await fetchMovieDetails(movieId).then((data) => {
        if (data === undefined) {
          console.log("404!!!!");
        }

        if (isMounted) {
          setMovieDetails(data);
          setLoading(false);
        }
      });
    };

    getMovieDetails();
    return () => {
      isMounted = false;
    };
  }, [movieId]);

  const formatRuntime = (runtime) => {
    let hours = (runtime / 60).toFixed(0);
    let minutes = runtime % 60;

    return `${hours}h ${minutes}min`;
  };

  const d = new Date(`${movieDetails.release_date}`);

  const directorList =
    movieDetails.directors &&
    movieDetails.directors.map((d) => d.name).join(" • ");

  const writerList =
    movieDetails.writers &&
    movieDetails.writers.map((w) => `${w.name} (${w.job})`).join(" • ");

  const recommended =
    movieDetails.recommended &&
    movieDetails.recommended.map((movie) => {
      return formatResults(movie);
    });

  const topCastList =
    movieDetails.credits &&
    movieDetails.credits.cast
      .slice(0, 10)
      .map((person) => <PersonCard key={person.id} person={person} />);

  const recommendedList =
    recommended &&
    recommended.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  const MovieBanner = () => {
    return (
      <Grid.Row>
        <Grid.Column width={5}>
          <Image src={movieDetails.poster} />
        </Grid.Column>

        <Grid.Column width={11}>
          <Header className="body-headers" as="h1" color="green" inverted>
            {movieDetails.title}
            <Header.Subheader style={{ marginTop: "5px" }}>
              {d.toDateString().split(" ").slice(1).join(" ")} {" • "}
              {formatRuntime(movieDetails.runtime)}
              {" • "}
              <span className="myrating">
                {movieDetails.rating ? movieDetails.rating : "NR"}
              </span>
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
                  {movieDetails.directors.length > 1 ? "Directors" : "Director"}
                </List.Header>
                <List.Description>{directorList}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon inverted name="pencil" />
              <List.Content>
                <List.Header>
                  {movieDetails.writers.length > 1 ? "Writers" : "Writer"}
                </List.Header>
                <List.Description>{writerList}</List.Description>
              </List.Content>
            </List.Item>
          </List>

          <Divider hidden />

          <Modal
            basic
            size="large"
            trigger={
              movieDetails.movieTrailerKey !== undefined && (
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
                id={movieDetails.movieTrailerKey}
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
      ) : (
        <>
          <div
            style={{
              background: `linear-gradient(to right, rgb(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)),
              url(${movieDetails.backdrop}) no-repeat center/cover`,
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
            <Grid stackable relaxed>
              <Grid.Row>
                <Grid.Column width={13}>
                  <Header className="body-headers" color="green" inverted>
                    Top Cast
                  </Header>
                  <div className="scroll-container">
                    <ScrollMenu>{topCastList}</ScrollMenu>
                  </div>
                </Grid.Column>

                <Grid.Column width={3}>
                  <SidebarDetails />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={13}>
                  {recommended.length !== 0 && (
                    <>
                      <Header className="body-headers" color="green" inverted>
                        Recommended
                      </Header>
                      <div className="scroll-container">
                        <ScrollMenu>{recommendedList}</ScrollMenu>
                      </div>
                    </>
                  )}
                </Grid.Column>

                <Grid.Column width={3}>
                  <Header className="body-headers" color="green" inverted>
                    Keywords
                  </Header>
                  <Button.Group vertical>
                    {movieDetails.keywords &&
                      movieDetails.keywords.slice(0, 9).map((keyword) => {
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
