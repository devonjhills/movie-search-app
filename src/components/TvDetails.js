import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
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
import { fetchTvDetails } from "../api/api";
import { imageUrl, largeImageUrl, logoUrl } from "../api/constants";
import { getShowTrailer } from "../api/helpers";
import MediaCard from "./MediaCard";
import PersonCard from "./PersonCard";
import ScrollToTop from "./ScrollToTop";
import SocialButtons from "./SocialButtons";

const TvDetails = () => {
  const urlId = useParams();
  const tvId = urlId.tvId;

  const [tvDetails, setTvDetails] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //https://stackoverflow.com/questions/53949393/
    //cant-perform-a-react-state-update-on-an-unmounted-component
    let isMounted = true;

    const getTvDetails = async () => {
      await fetchTvDetails(tvId).then((data) => {
        if (isMounted) {
          setTvDetails(data);
          setTrailer(getShowTrailer(data));
          setLoading(false);
        }
      });
    };

    getTvDetails();
    return () => {
      isMounted = false;
    };
  }, [tvId]);

  const d = new Date(`${tvDetails.first_air_date}`);

  const topCastList =
    tvDetails?.credits &&
    tvDetails?.credits.cast
      .slice(0, 10)
      .map((person) => <PersonCard key={person.id} person={person} />);

  const recommendedList = tvDetails?.recommendations?.results.map((show) => (
    <MediaCard
      key={show.id}
      id={show.id}
      poster={show.poster_path}
      mediaType="tv"
    />
  ));

  const keywords = tvDetails?.keywords?.results;

  const history = useHistory();

  const onKeywordClick = (keyword) => {
    history.push(`/discover?media=tv&keyword=${keyword.name}&id=${keyword.id}`);
  };

  const onGenreClick = (genre) => {
    history.push(`/discover?media=tv&genre=${genre.name}&id=${genre.id}`);
  };

  const TvBanner = () => {
    const creatorsList =
      tvDetails.created_by &&
      tvDetails.created_by.map((d) => (
        <Link key={d.credit_id} to={`/person/${d.id}`}>
          <div className="chip">{d.name}</div>
        </Link>
      ));

    return (
      <Grid.Row className="mysegment">
        <Grid.Column width={5}>
          {tvDetails.poster_path ? (
            <Image src={imageUrl + tvDetails.poster_path} />
          ) : (
            <div className="no-search-image">
              <Icon size="massive" name="image outline" color="grey" />
            </div>
          )}
        </Grid.Column>

        <Grid.Column width={11}>
          <Header as="h1" inverted>
            {tvDetails.name.toUpperCase()}

            <Header.Subheader style={{ marginTop: "5px" }}>
              {tvDetails.first_air_date && d.getFullYear()}
              {" • "}
              {tvDetails.number_of_seasons &&
                `${tvDetails.number_of_seasons} Seasons`}
              {" • "}
              {tvDetails.number_of_episodes &&
                `${tvDetails.number_of_episodes} Episodes`}
              {" • "}
              {tvDetails.genres &&
                tvDetails.genres.map((genre) => {
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
            {tvDetails.tagline}
          </Header>

          {tvDetails.overview ? (
            <p>{tvDetails.overview}</p>
          ) : (
            <p>No synopsis found for this show</p>
          )}

          {creatorsList?.length !== 0 && (
            <Header inverted as="h5">
              <Icon inverted name="users" />
              <Header.Content>
                Created By
                <Header.Subheader>{creatorsList}</Header.Subheader>
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
                      <div className="chip">{tvDetails.name} Trailer</div>
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
              {tvDetails.vote_average} /10
            </List.Header>
            <List.Description>
              {tvDetails.vote_count.toLocaleString("en-US")} Ratings
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          {tvDetails.networks.length !== 0 && (
            <List.Content>
              <List.Header>Network</List.Header>
              <List.Description>
                <Button
                  compact
                  disabled
                  color="grey"
                  style={{ marginTop: ".2em" }}>
                  <Image src={logoUrl + tvDetails.networks[0].logo_path} />
                </Button>
              </List.Description>
            </List.Content>
          )}
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Type</List.Header>
            <List.Description>{tvDetails.type}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Status</List.Header>
            <List.Description>{tvDetails.status}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <SocialButtons externals={tvDetails.external_ids} />
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
        <div
          style={{
            background: `linear-gradient(to right, rgb(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)),
              url(${
                largeImageUrl + tvDetails.backdrop_path
              }) no-repeat center/cover`,
          }}>
          <Container>
            <Segment basic>
              <Grid verticalAlign="middle" stackable relaxed padded>
                <TvBanner />

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
                    {tvDetails?.recommendations?.results?.length !== 0 && (
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

export default TvDetails;
