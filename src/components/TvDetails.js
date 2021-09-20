import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  Container,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Segment,
} from "semantic-ui-react";
import { fetchTvDetails } from "../api/api";
import { imageUrl, largeImageUrl } from "../api/constants";
import ScrollToTop from "./ScrollToTop";

const TvDetails = () => {
  const urlId = useParams();
  const tvId = urlId.tvId;

  const [tvDetails, setTvDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //https://stackoverflow.com/questions/53949393/
    //cant-perform-a-react-state-update-on-an-unmounted-component
    let isMounted = true;

    const getTvDetails = async () => {
      await fetchTvDetails(tvId).then((data) => {
        if (isMounted) {
          setTvDetails(data);
          setLoading(false);
        }
      });
    };

    getTvDetails();
    return () => {
      isMounted = false;
    };
  }, [tvId]);

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
              {tvDetails.number_of_seasons &&
                `${tvDetails.number_of_seasons} Seasons`}
              {" • "}
              {tvDetails.number_of_episodes &&
                `${tvDetails.number_of_episodes} Episodes`}
              {" • "}
              {tvDetails.genres &&
                tvDetails.genres.map((genre) => {
                  return (
                    <div key={genre.id} className="chip">
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
        </Grid.Column>
      </Grid.Row>
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
              </Grid>
            </Segment>
          </Container>
        </div>
      )}
    </>
  );
};

export default TvDetails;
