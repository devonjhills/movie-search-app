import React from "react";
import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import { posterCardUrl } from "../api/constants";

const MediaCard = ({ media, mediaType }) => {

  const url = () => {
    if (mediaType === 'movie') {
      return `/${media.id}`
    } else if (mediaType === 'tv') {
      return `/tvhub/${media.id}`
    }
  }
  

  return (
    <Link to={url}>
      <div className="moviecard">
        {media.poster_path !== null ? (
          <Image src={posterCardUrl + media.poster_path} />
        ) : (
          <div className="no-user">
            <Icon size="massive" name="image outline" color="black" />
          </div>
        )}
      </div>
    </Link>
  );
};

export default MediaCard;
