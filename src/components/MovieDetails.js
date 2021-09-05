import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "semantic-ui-react";
import { fetchMovieDetails, imageUrl } from "../api/api";
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

  const MovieBanner = () => {
    return (
      <div
        style={{
          background: `linear-gradient(rgb(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
            url(${movieDetails.backdrop}) no-repeat fixed right -200px top/contain`,
        }}>
        <Grid stackable padded relaxed>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src={movieDetails.poster} />
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as="h1" inverted>
                {movieDetails.title}
                <Divider hidden />
                <Header.Subheader>
                  {" "}
                  {d.toDateString().split(" ").slice(1).join(" ")} •{" "}
                  {formatRuntime(movieDetails.runtime)} •{" "}
                  <span className="myrating">
                    {movieDetails.rating ? movieDetails.rating : "NR"}
                  </span>
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
              <Divider hidden />
              {movieDetails.genres &&
                movieDetails.genres.map((genre) => {
                  return (
                    <Button key={genre.id} compact circular inverted>
                      {genre.name}
                    </Button>
                  );
                })}
              <Divider hidden />

              <Modal
                basic
                size="large"
                trigger={
                  movieDetails.movieTrailerKey !== undefined && (
                    <Button icon labelPosition="left">
                      <Icon name="play" />
                      Play {movieDetails.title} Trailer
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
        </Grid>
      </div>
    );
  };

  const SidebarDetails = () => {
    return (
      <List inverted divided size="big" relaxed>
        <List.Item>
          <SocialButtons externals={movieDetails.external_ids} />
        </List.Item>
        {movieDetails.homepage && (
          <List.Item>
            <List.Icon inverted color="blue" name="linkify" />
            <List.Content as="h3">
              <a href={movieDetails.homepage}>Official Site</a>
            </List.Content>
          </List.Item>
        )}
        <List.Item>
          <List.Icon name="star" color="yellow" verticalAlign="middle" />
          <List.Content>
            <List.Header>{movieDetails.vote_average} /10</List.Header>
            <List.Description>
              {movieDetails.vote_count.toLocaleString("en-US")} Ratings
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon
            name="dollar"
            size="large"
            color="green"
            verticalAlign="middle"
          />
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
          <List.Icon
            name="dollar"
            size="large"
            color="green"
            verticalAlign="middle"
          />
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
          <List.Icon
            name="calendar alternate outline"
            color="grey"
            verticalAlign="middle"
          />
          <List.Content>
            <List.Header>Status</List.Header>
            <List.Description>{movieDetails.status}</List.Description>
          </List.Content>
        </List.Item>
      </List>
    );
  };

  const directorList =
    movieDetails.directors &&
    movieDetails.directors.map((director) => {
      return (
        <Card key={director.id}>
          <Image size='small' src={imageUrl + director.profile_path} />
          <Card.Content>
            <Card.Header>{director.name}</Card.Header>
            <Card.Meta>{director.job}</Card.Meta>
          </Card.Content>
        </Card>
      );
    });

  const topCastList =
    movieDetails.credits &&
    movieDetails.credits.cast.slice(0, 5).map((actor) => {
      return (
        <Card key={actor.id}>
          <Image size='small' src={imageUrl + actor.profile_path} />
          <Card.Content>
            <Card.Header>{actor.name}</Card.Header>
            <Card.Meta>{actor.character}</Card.Meta>
          </Card.Content>
        </Card>
      );
    });

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
          <MovieBanner />
          <Grid stackable padded>
            <Grid.Column width={4}>
              <SidebarDetails />
            </Grid.Column>
            <Grid.Column width={12}>
              <Card.Group centered doubling itemsPerRow='6'>
                {directorList}
                {topCastList}
              </Card.Group>
            </Grid.Column>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default MovieDetails;
