import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Embed,
  Grid,
  Header,
  Image,
  List,
  Loader,
  Message,
} from "semantic-ui-react";
import { fetchMovieDetails } from "../api/api";
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
          <div
            style={{
              background: `linear-gradient(rgb(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
            url(${movieDetails.backdrop}) no-repeat fixed right -500px top/cover`,
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
                  <p>{movieDetails.overview}</p>
                  <Divider hidden />
                  {movieDetails.genres &&
                    movieDetails.genres.map((genre) => {
                      return (
                        <Button key={genre.id} compact circular inverted>
                          {genre.name}
                        </Button>
                      );
                    })}
                </Grid.Column>
              </Grid.Row>

            </Grid>
          </div>
          <Grid stackable padded>
            <Grid.Column width={4}>
              <List inverted divided size="big" relaxed>
              <List.Item>
                  <SocialButtons externals={movieDetails.external_ids} />
                </List.Item>
                <List.Item>
                  <List.Icon
                    name="star"
                    color="yellow"
                    verticalAlign="middle"
                  />
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
            </Grid.Column>
            <Grid.Column width={12}>
              {movieDetails.movieTrailerKey !== undefined ? (
                <Embed
                  id={movieDetails.movieTrailerKey}
                  source="youtube"
                  placeholder={movieDetails.backdrop}
                  iframe={{
                    allowFullScreen: true,
                    style: {
                      padding: 1,
                    },
                  }}
                />
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
                  <Embed active id="GJDNkVDGM_s" source="youtube" />
                </>
              )}
            </Grid.Column>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default MovieDetails;
