import React from "react";
import { Icon, Item } from "semantic-ui-react";
import { searchResultUrl } from "../api/api";

const SearchResultsTV = ({ show }) => {
  const d = new Date(`${show.first_air_date}`);

  return (
    <Item>
      {show.poster_path ? (
        <Item.Image size="tiny" src={searchResultUrl + show.poster_path} />
      ) : (
        <div className="no-search-image">
          <Icon size="huge" name="image outline" color="grey" />
        </div>
      )}

      <Item.Content>
        <Item.Header>{show.name}</Item.Header>
        <Item.Meta>{d.toDateString().split(" ").slice(1).join(" ")}</Item.Meta>
        <Item.Description className="search-text">
          {show.overview}
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

export default SearchResultsTV;
