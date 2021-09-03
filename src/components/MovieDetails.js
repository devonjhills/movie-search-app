import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Message,
} from "semantic-ui-react";
import { fetchMovieDetails } from "../api/api";

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
          <Message floating warning icon>
            <Icon name="circle notched" loading />
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
              We are fetching that content for you.
            </Message.Content>
          </Message>
        </Container>
      ) : (
        <Grid stackable container divided="vertically" inverted>
          <Grid.Row>
            <Grid.Column floated="left" width={10}>
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
            <Grid.Column floated="right" width={6}>
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
            <Grid.Column width="5">
              <Image src={movieDetails.poster} />
            </Grid.Column>
            <Grid.Column width="11">
              {movieDetails.movieTrailerKey !== undefined ? (
                <ReactPlayer controls width="100%" url={trailerUrl} />
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
                    width='100%'
                    url="https://www.youtube.com/watch?v=GJDNkVDGM_s"
                  />
                </>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>MORE</Grid.Row>
        </Grid>
      )}
    </>
  );
};

export default MovieDetails;
