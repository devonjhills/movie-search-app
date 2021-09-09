import React, { useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { useParams, Redirect } from "react-router-dom";
import {
  Button,
  Card,
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
  Message,
  Modal,
  Segment,
} from "semantic-ui-react";
import { fetchMovieDetails, formatResults, imageUrl } from "../api/api";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import ScrollToTop from "./ScrollToTop";
import SocialButtons from "./SocialButtons";

const MovieDetails = () => {
  const urlId = useParams();
  const movieId = urlId.movieId;

  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    //https://stackoverflow.com/questions/53949393/
    //cant-perform-a-react-state-update-on-an-unmounted-component
    let isMounted = true;

    const getMovieDetails = async () => {
      await fetchMovieDetails(movieId).then((data) => {
        if (data === undefined) {
          console.log("404!!!!");
          setRedirect(true);
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
          <Header as="h1" inverted>
            {movieDetails.title}
            <Header.Subheader style={{ marginTop: "5px" }}>
              <span className="myrating">
                {movieDetails.rating ? movieDetails.rating : "NR"}
              </span>
              {" • "} {d.toDateString().split(" ").slice(1).join(" ")} {" • "}
              {formatRuntime(movieDetails.runtime)}
              {" • "}
              {movieDetails.genres &&
                movieDetails.genres.map((genre) => {
                  return (
                    <Button
                      secondary
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
            <Message
              color="black"
              error
              icon="ban"
              header="No synopsis found for this movie"
            />
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
                <Button secondary>
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

  const Arrow = ({ icon }) => {
    return (
      <Button
        style={{
          height: '200px',
          width: '20px',
          margin: 'auto',
          marginLeft: '5px',
          marginRight: '5px',
        }}
        size="tiny"
        compact
        inverted
        color="black">
        <Icon size='big' name={icon} />
      </Button>
    );
  };

  const ArrowLeft = Arrow({ icon: "caret left" });
  const ArrowRight = Arrow({ icon: "caret right" });

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
              background: `linear-gradient(to left, rgb(0, 0, 0, 0.4), rgba(0, 0, 0, 8.0)),
      url(${movieDetails.backdrop}) no-repeat right -200px top/cover`,
              width: "100%",
              position: "relative",
            }}>
            <Container>
              <Grid verticalAlign="middle" stackable padded relaxed>
                <MovieBanner />
              </Grid>
            </Container>
          </div>

          <Container>
            <Grid stackable padded relaxed>
              <Grid.Row>
                <Grid.Column width={13}>
                  <ScrollMenu LeftArrow={ArrowLeft} RightArrow={ArrowRight}>
                    {topCastList}
                  </ScrollMenu>
                </Grid.Column>

                <Grid.Column width={3}>
                  <SidebarDetails />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  {recommended.length !== 0 && (
                    <Image.Group>
                      <ScrollMenu LeftArrow={ArrowLeft} RightArrow={ArrowRight}>
                        {recommendedList}
                      </ScrollMenu>
                    </Image.Group>
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
