import React from "react";
import { Button } from "semantic-ui-react";

const SocialButtons = ({ externals }) => {

  let fbUrl = "https://www.facebook.com/" + externals.facebook_id;
  let imdbUrl = "https://www.imdb.com/title/" + externals.imdb_id;
  let igUrl = "https://www.instagram.com/" + externals.instagram_id;
  let twitterUrl = "https://www.twitter.com/" + externals.twitter_id;

  return (
    <>
      <Button
        size="large"
        circular
        disabled={externals.facebook_id === null}
        as="a"
        href={fbUrl}
        inverted
        color="blue"
        icon="facebook"
      />
      <Button
        size="large"
        circular
        disabled={externals.twitter_id === null}
        as="a"
        href={twitterUrl}
        inverted
        color="teal"
        icon="twitter"
      />
      <Button
        size="large"
        circular
        disabled={externals.instagram_id === null}
        as="a"
        href={igUrl}
        inverted
        color="purple"
        icon="instagram"
      />
      <Button
        size="large"
        circular
        disabled={externals.imdb_id === null}
        as="a"
        href={imdbUrl}
        inverted
        color="yellow"
        icon="imdb"
      />
    </>
  );
};

export default SocialButtons;
