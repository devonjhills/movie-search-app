import React from "react";
import { Link } from "react-router-dom";
import { Icon, Item } from "semantic-ui-react";
import { searchResultUrl } from "../api/constants";

const SearchResultsMovies = ({ movie }) => {
  const d = new Date(`${movie.release_date}`);

  return (
    <Item as={Link} to={`/${movie.id}`}>
      {movie.poster_path ? (
        <Item.Image size="tiny" src={searchResultUrl + movie.poster_path} />
      ) : (
        <div className="no-search-image">
          <Icon size="huge" name="image outline" color="grey" />
        </div>
      )}

      <Item.Content>
        <Item.Header>
          <span className="link-hover">{movie.title}</span>
        </Item.Header>
        <Item.Meta>{d.toDateString().split(" ").slice(1).join(" ")}</Item.Meta>
        <Item.Description className="search-text">
          {movie.overview}
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

export default SearchResultsMovies;
