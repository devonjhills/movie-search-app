import React from "react";
import { Icon } from "semantic-ui-react";

const SocialButtons = ({ externals }) => {
  let fbUrl = "https://www.facebook.com/" + externals.facebook_id;
  let imdbUrl = "https://www.imdb.com/title/" + externals.imdb_id;
  let igUrl = "https://www.instagram.com/" + externals.instagram_id;
  let twitterUrl = "https://www.twitter.com/" + externals.twitter_id;

  return (
    <div className='center'>
      {externals.facebook_id && (
        <a href={fbUrl}>
          <Icon size='big' color="blue" name="facebook" link />
        </a>
      )}
      {externals.twitter_id && (
        <a href={twitterUrl}>
          <Icon size='big' color="teal" name="twitter" link />
        </a>
      )}
      {externals.instagram_id && (
        <a href={igUrl}>
          <Icon size='big' color="violet" name="instagram" link />
        </a>
      )}
      {externals.imdb_id && (
        <a href={imdbUrl}>
          <Icon size='big' color="yellow" name="imdb" link />
        </a>
      )}
    </div>
  );
};

export default SocialButtons;
