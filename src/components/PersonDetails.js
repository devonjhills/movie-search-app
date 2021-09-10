import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Container,
  Dimmer,
  Divider,
  Grid,
  Header,
  Image,
  Loader,
} from "semantic-ui-react";
import { fetchPersonDetails, imageUrl } from "../api/api";
import ScrollToTop from "./ScrollToTop";
import SocialButtons from "./SocialButtons";

const PersonDetails = () => {
  const urlId = useParams();
  const personId = urlId.personId;

  const [personDetails, setPersonDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //https://stackoverflow.com/questions/53949393/
    //cant-perform-a-react-state-update-on-an-unmounted-component
    let isMounted = true;

    const getPersonDetails = async () => {
      await fetchPersonDetails(personId).then((data) => {
        if (data === undefined) {
          console.log("404!!!!");
        }

        if (isMounted) {
          setPersonDetails(data);
          setLoading(false);
        }
      });
    };

    getPersonDetails();
    return () => {
      isMounted = false;
    };
  }, [personId]);

  console.dir(personDetails);

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
        <Container>
          <Grid verticalAlign="middle" stackable relaxed padded>
            <Grid.Row>
              <Grid.Column width={5}>
                <Image src={imageUrl + personDetails.profile_path} />

                <Divider hidden />

                <SocialButtons externals={personDetails.external_ids} />
              </Grid.Column>

              <Grid.Column width={11}>
                <Header className="body-headers" as="h1" color="green" inverted>
                  {personDetails.name}
                </Header>

                {personDetails.biography ? (
                  <p>{personDetails.biography}</p>
                ) : (
                  <p>~~No biography found for this movie~~</p>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default PersonDetails;