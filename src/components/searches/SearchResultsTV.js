import React from "react";
import { Link } from "react-router-dom";
import { Icon, Item } from "semantic-ui-react";
import { searchResultUrl } from "../../api/constants";

const SearchResultsTV = ({ show }) => {
  const d = new Date(`${show.first_air_date}`);

  return (
    <Item as={Link} to={`/tvhub/${show.id}`}>
      {show.poster_path ? (
        <Item.Image size="tiny" src={searchResultUrl + show.poster_path} />
      ) : (
        <div className="no-search-image">
          <Icon size="huge" name="image outline" color="grey" />
        </div>
      )}

      <Item.Content>
        <Item.Header>
          <span className="link-hover">{show.name}</span>
        </Item.Header>
        <Item.Meta>
          {show.first_air_date
            ? d.getFullYear()
            : "Date Not Found"}
        </Item.Meta>
        <Item.Description className="search-text">
          {show.overview}
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

export default SearchResultsTV;
