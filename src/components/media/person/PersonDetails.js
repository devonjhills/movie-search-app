import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Container,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
} from "semantic-ui-react";
import { fetchPersonDetails } from "../../../api/api";
import { imageUrl } from "../../../api/constants";
import ScrollToTop from "../../utils/ScrollToTop";
import SocialButtons from "../SocialButtons";

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
          console.log("Person Details not found");
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
            <Grid.Row className='mysegment'>
              <Grid.Column width={5}>
                {personDetails.profile_path ? (
                  <Image src={imageUrl + personDetails.profile_path} />
                ) : (
                  <div className="no-search-image">
                    <Icon size="massive" name="user circle" color="grey" />
                  </div>
                )}

                <Divider hidden />

                <SocialButtons externals={personDetails.external_ids} />
              </Grid.Column>

              <Grid.Column width={11}>
                <Header className="body-headers" as="h1" inverted>
                {personDetails.name.toUpperCase()}
                </Header>

                {personDetails.biography ? (
                  <p>{personDetails.biography}</p>
                ) : (
                  <p>No biography found for this person</p>
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
