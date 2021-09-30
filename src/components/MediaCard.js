import React from "react";
import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import { posterCardUrl } from "../api/constants";

const MediaCard = ({ id, poster, mediaType }) => {

  const url = () => {
    if (mediaType === 'movie') {
      return `/${id}`
    } else if (mediaType === 'tv') {
      return `/tvhub/${id}`
    }
  }
  

  return (
    <Link to={url}>
      <div className="moviecard">
        {poster !== null ? (
          <Image style={{borderRadius: '10px'}} src={posterCardUrl + poster} />
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
