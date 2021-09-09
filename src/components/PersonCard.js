import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import { personThumbnailUrl } from "../api/api";

const PersonCard = ({ person }) => {
  const [redirect, setRedirect] = useState(false);

  const { pathname } = useLocation();

  if (redirect === true) {
    console.log('PERSON REDIRECT?')
    return <Redirect pathname={pathname} push to={`/${person.id}`} />;
  }

  const clicky = () => {
    console.log('PERSON REDIRECT?')
    setRedirect(true);
  }

  return (
    <div className="person" onClick={clicky}>
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
  );
};

export default PersonCard;
