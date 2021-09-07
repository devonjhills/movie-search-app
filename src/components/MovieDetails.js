import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Embed,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Loader,
  Message,
  Modal,
} from "semantic-ui-react";
import { fetchMovieDetails, formatResults, imageUrl } from "../api/api";
import MovieCard from "./MovieCard";
import SocialButtons from "./SocialButtons";

const MovieDetails = () => {
  const urlId = useParams();
  const movieId = urlId.id;

  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      await fetchMovieDetails(movieId).then((data) => {
        setMovieDetails(data);
        setLoading(false);
      });
    };

    getMovieDetails();
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

  const topCastList =
    movieDetails.credits &&
    movieDetails.credits.cast.slice(0, 6).map((actor) => {
      return (
        <Card key={actor.id}>
          {actor.profile_path !== null ? (
            <Image src={imageUrl + actor.profile_path} />
          ) : (
            <Message compact size="huge" icon="user" />
          )}
          <Card.Content>
            <Card.Header>{actor.name}</Card.Header>
            <Card.Meta>{actor.character}</Card.Meta>
          </Card.Content>
        </Card>
      );
    });

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
          <p>
            {movieDetails.overview ? (
              movieDetails.overview
            ) : (
              <Message
                color="black"
                error
                icon="ban"
                header="No synopsis found for this movie"
              />
            )}
          </p>

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
      <List size="huge" inverted relaxed divided>
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

  const recommended =
    movieDetails.recommended &&
    movieDetails.recommended.slice(0, 15).map((movie) => {
      return formatResults(movie);
    });

  console.log(recommended);

  return (
    <>
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
              background: `linear-gradient(to left, rgb(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)),
      url(${movieDetails.backdrop}) no-repeat right -200px top/cover`,
              width: '100%',
              position: 'relative',
            }}>
            <Container>
              <Grid verticalAlign="middle" stackable padded relaxed>
                <MovieBanner />
              </Grid>
            </Container>
          </div>

          <Container>
            <Grid stackable padded relaxed verticalAlign="bottom">
              <Grid.Row>
                <Grid.Column width={13}>
                  <Grid.Row>
                    <Header floated="left" size="large" inverted>
                      Top Cast
                    </Header>

                    <Header floated="right" inverted size="small">
                      Full Cast & Crew
                      <Icon name="right arrow" />
                    </Header>
                  </Grid.Row>
                  <Card.Group doubling itemsPerRow="6">
                    {topCastList}
                  </Card.Group>
                </Grid.Column>

                <Grid.Column width={3}>
                  <SidebarDetails />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  {recommended && (
                    <Header size="large" inverted>
                      Recommended
                    </Header>
                  )}
                  <Image.Group>
                    {recommended &&
                      recommended.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                  </Image.Group>
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
