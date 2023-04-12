import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useParams, Link, useHistory } from "react-router-dom";
import {
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
import { fetchMovieDetails, formatResults } from "../../../api/api";
import { imageUrl, largeImageUrl } from "../../../api/constants";
import {
  getMovieDirectors,
  getMovieRating,
  getMovieTrailer,
  getMovieWriters,
} from "../../../api/helpers";
import MediaCard from "../MediaCard";
import PersonCard from "../person/PersonCard";
import ScrollToTop from "../../utils/ScrollToTop";
import SocialButtons from "../SocialButtons";

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

  const topCastList =
    movieDetails?.credits &&
    movieDetails?.credits.cast
      .slice(0, 10)
      .map((person) => <PersonCard key={person.id} person={person} />);

  const recommendedList = movieDetails?.recommendations?.results.map((movie) => (
    <MediaCard key={movie.id} id={movie.id} poster={movie.poster_path} mediaType="movie" />
  ));

  const history = useHistory();

  const onKeywordClick = (keyword) => {
    history.push(
      `/discover?media=movie&keyword=${keyword.name}&id=${keyword.id}`
    );
  };

  const onGenreClick = (genre) => {
    history.push(`/discover?media=movie&genre=${genre.name}&id=${genre.id}`);
  };

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
        <Link key={d.credit_id} to={`/person/${d.id}`}>
          <div className="chip">{d.name}</div>
        </Link>
      ));

    const writerList =
      writers &&
      writers.map((w) => (
        <Link key={w.credit_id} to={`/person/${w.id}`}>
          <div className="chip">{`${w.name} (${w.job})`}</div>
        </Link>
      ));

    return (
      <Grid.Row className="mysegment">
        <Grid.Column width={5}>
          {movieDetails.poster_path ? (
            <Image
              style={{ borderRadius: "10px" }}
              src={imageUrl + movieDetails.poster_path}
            />
          ) : (
            <div className="no-search-image">
              <Icon size="massive" name="image outline" color="grey" />
            </div>
          )}
        </Grid.Column>

        <Grid.Column width={11}>
          <Header as="h1" inverted>
            {movieDetails.title.toUpperCase()}

            <Header.Subheader style={{ marginTop: "5px" }}>
              {d.toDateString().split(" ").slice(1).join(" ")} {" • "}
              {formatRuntime(movieDetails.runtime)}
              {" • "}
              <span className="myrating">{rating ? rating : "NR"}</span>
              {" • "}
              {movieDetails.genres &&
                movieDetails.genres.map((genre) => {
                  return (
                    <div
                      key={genre.id}
                      className="chip"
                      onClick={() => onGenreClick(genre)}>
                      {genre.name}
                    </div>
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
            <p>No synopsis found for this movie</p>
          )}

          {directors?.length !== 0 && (
            <Header inverted as="h5">
              <Icon inverted name="video" />
              <Header.Content>
                {directors?.length > 1 ? "Directors" : "Director"}
                <Header.Subheader>{directorList}</Header.Subheader>
              </Header.Content>
            </Header>
          )}

          {writers?.length !== 0 && (
            <Header inverted as="h5">
              <Icon inverted name="pencil" />
              <Header.Content>
                {writers.length > 1 ? "Writers" : "Writer"}
                <Header.Subheader>{writerList}</Header.Subheader>
              </Header.Content>
            </Header>
          )}

          <Divider hidden />

          {trailer && (
            <Header inverted as="h5">
              <Icon inverted name="play" />
              <Header.Content>
                <Modal
                  basic
                  size="large"
                  trigger={
                    trailer !== undefined && (
                      <div className="chip">{movieDetails.title} Trailer</div>
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
              </Header.Content>
            </Header>
          )}
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
        <div
          style={{
            background: `linear-gradient(to right, rgb(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)),
              url(${
                largeImageUrl + movieDetails.backdrop_path
              }) no-repeat center/cover`,
          }}>
          <Container>
            <Segment basic>
              <Grid verticalAlign="middle" stackable relaxed padded>
                <MovieBanner />
              </Grid>

              <Grid stackable relaxed padded>
                <Grid.Row className="mysegment">
                  <Grid.Column width={12}>
                    {topCastList.length !== 0 && (
                      <>
                        <Header inverted>Top Cast</Header>
                        <div className="scroll-container">
                          <ScrollMenu>{topCastList}</ScrollMenu>
                        </div>
                      </>
                    )}
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Segment basic>
                      <SidebarDetails />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row className="mysegment">
                  <Grid.Column width={12}>
                    {recommendedList.length !== 0 && (
                      <>
                        <Header inverted>Recommended</Header>
                        <div className="scroll-container">
                          <ScrollMenu>{recommendedList}</ScrollMenu>
                        </div>
                      </>
                    )}
                  </Grid.Column>
                  <Grid.Column width={4}>
                    {keywords.length !== 0 && (
                      <>
                        <Header inverted>Keywords</Header>
                        {keywords
                          .slice(0, 15)
                          .sort((a, b) => a.name.length - b.name.length)
                          .map((keyword) => {
                            return (
                              <div
                                key={keyword.id}
                                className="chip"
                                onClick={() => onKeywordClick(keyword)}>
                                {keyword.name}
                              </div>
                            );
                          })}
                      </>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Container>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
