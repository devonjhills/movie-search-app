import React from "react";
import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import { personThumbnailUrl } from "../../../api/constants";

const PersonCard = ({ person }) => {
  return (
    <Link to={`/person/${person.id}`}>
      <div className="person">
        {person.profile_path !== null ? (
          <Image src={personThumbnailUrl + person.profile_path} />
        ) : (
          <div className="no-user">
            <Icon size="massive" name="user circle" color="black" />
          </div>
        )}
        <h4>{person.name}</h4>
        <p>{person.character}</p>
      </div>
    </Link>
  );
};

export default PersonCard;
