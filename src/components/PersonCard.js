import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { personThumbnailUrl } from "../api/api";

const PersonCard = ({ person }) => {
  const [redirect, setRedirect] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    //TODO: uncomment when Person Details page is implemented
    //setRedirect(true);
  };

  const { pathname } = useLocation();

  if (redirect === true) {
    return <Redirect pathname={pathname} push to={`/${person.id}`} />;
  }

  console.log(person?.profile_path);

  return (
    <Card
      style={{ marginRight: "5px", height: "100%", maxWidth: "150px" }}
      key={person.id}
      onClick={handleClick}>
      {person.profile_path !== null ? (
        <Image src={personThumbnailUrl + person.profile_path} />
      ) : (
        <div className="no-user">
          <Icon size="massive" name="user circle" color="black" />
        </div>
      )}
      <Card.Content>
        <Card.Header textAlign="center" style={{ color: "white" }}>
          {person.name}
        </Card.Header>
        <Card.Meta textAlign="center" style={{ color: "grey" }}>
          {person.character}
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default PersonCard;
