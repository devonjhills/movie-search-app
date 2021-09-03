import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Message,
} from "semantic-ui-react";
import { fetchMovieDetails } from "../api/api";
import SocialButtons from "./SocialButtons";

const MovieDetails = () => {
  const urlId = useParams();
  const movieId = urlId.id;
  const youtubeUrl = "https://www.youtube.com/watch?v=";

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

  const trailerUrl = youtubeUrl + movieDetails.movieTrailerKey;

  return (
    <>
      {loading ? (
        <Container>
          <Dimmer active>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        </Container>
      ) : (
        <Grid stackable container>
          <Grid.Row>
            <Grid.Column floated="left" width={12}>
              <Header as="h1" inverted>
                {movieDetails.title}
                <Header.Subheader>
                  {" "}
                  {d.toDateString().split(" ").slice(1).join(" ")} •{" "}
                  {formatRuntime(movieDetails.runtime)} •{" "}
                  <span className="myrating">
                    {movieDetails.rating ? movieDetails.rating : "NR"}
                  </span>
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column floated="right" width={4}>
              <Header inverted textAlign="center" floated="right">
                <Icon name="star" color="yellow" />
                <Header.Content>
                  {movieDetails.vote_average} /10
                  <Header.Subheader>
                    {movieDetails.vote_count.toLocaleString("en-US")} Ratings
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row stretched>
            <Grid.Column width={4}>
              <Image src={movieDetails.poster} />
            </Grid.Column>
            <Grid.Column width={12}>
              {movieDetails.movieTrailerKey !== undefined ? (
                <ReactPlayer light controls width="100%" url={trailerUrl} />
              ) : (
                <>
                  <Message
                    color="black"
                    error
                    compact
                    floating
                    icon="ban"
                    header="No trailer found for this movie"
                    content="But there is no need to be upset, enjoy this instead"
                  />
                  <ReactPlayer
                    light
                    width="100%"
                    url="https://www.youtube.com/watch?v=GJDNkVDGM_s"
                  />
                </>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="12">
              {movieDetails.genres &&
                movieDetails.genres.map((genre) => {
                  return (
                    <Button key={genre.id} compact circular inverted>
                      {genre.name}
                    </Button>
                  );
                })}
              <Header inverted as="h4" style={{ fontStyle: "italic" }}>
                {movieDetails.tagline}
              </Header>
              <p>{movieDetails.overview}</p>
            </Grid.Column>
            <Grid.Column floated="right" width="4">
              <div className="center">
                <SocialButtons externals={movieDetails.external_ids} />
              </div>
              <Divider />
              <Header as="h3" inverted content="Budget" />
              <p style={{ color: "green" }}>
                {movieDetails.budget === 0
                  ? "- - -"
                  : movieDetails.budget.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
              </p>
              <Header as="h3" inverted content="Revenue" />
              <p style={{ color: "green" }}>
                {movieDetails.revenue === 0
                  ? "- - -"
                  : movieDetails.revenue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row></Grid.Row>
        </Grid>
      )}
    </>
  );
};

export default MovieDetails;
