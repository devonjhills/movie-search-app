import React from "react";
import { Icon } from "semantic-ui-react";

const SocialButtons = ({ externals }) => {
  let fbUrl = "https://www.facebook.com/" + externals.facebook_id;
  let imdbMovieUrl = "https://www.imdb.com/title/" + externals.imdb_id;
  let imdbPersonUrl = "https://www.imdb.com/name/" + externals.imdb_id;
  let igUrl = "https://www.instagram.com/" + externals.instagram_id;
  let twitterUrl = "https://www.twitter.com/" + externals.twitter_id;
  let imdbUrl = "";

  externals.imdb_id && externals.imdb_id.includes("nm")
    ? (imdbUrl = imdbPersonUrl)
    : (imdbUrl = imdbMovieUrl);

  return (
    <div className="center">
      {externals.facebook_id && (
        <a href={fbUrl}>
          <Icon size="large" color="blue" name="facebook" link />
        </a>
      )}
      {externals.twitter_id && (
        <a href={twitterUrl}>
          <Icon size="large" color="teal" name="twitter" link />
        </a>
      )}
      {externals.instagram_id && (
        <a href={igUrl}>
          <Icon size="large" color="violet" name="instagram" link />
        </a>
      )}
      {externals.imdb_id && (
        <a href={imdbUrl}>
          <Icon size="large" color="yellow" name="imdb" link />
        </a>
      )}
    </div>
  );
};

export default SocialButtons;
