import React from "react";
import { Link } from "react-router-dom";
import { Icon, Item, List } from "semantic-ui-react";
import { searchResultUrl } from "../api/api";

const SearchResultsPeople = ({ person }) => {
  return (
    <Item>
      {person.profile_path ? (
        <Item.Image
          as={Link}
          to={`/person/${person.id}`}
          size="tiny"
          src={searchResultUrl + person.profile_path}
        />
      ) : (
        <div className='no-search-image'>
          <Icon size="huge" name="user circle" color="grey" />
        </div>
      )}

      <Item.Content>
        <Item.Header as={Link} to={`/person/${person.id}`}>
          {person.name}
        </Item.Header>
        <Item.Meta>{person.known_for_department}</Item.Meta>
        <Item.Description>
          <List bulleted link>
            {person.known_for.map((item) => {
              if (item.media_type === "movie") {
                return (
                  <List.Item as={Link} to={`/${item.id}`} key={item.id}>
                    {item.title}
                  </List.Item>
                );
              }

              if (item.media_type === "tv") {
                return <List.Item key={item.id}>{item.name}</List.Item>;
              }

              return "";
            })}
          </List>
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

export default SearchResultsPeople;
