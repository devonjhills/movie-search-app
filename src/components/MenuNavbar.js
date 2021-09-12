import React, { useState } from "react";
import "../App.css";
import { Icon, Menu, Form } from "semantic-ui-react";
import { NavLink, useHistory } from "react-router-dom";

const MenuNavbar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [query, setQuery] = useState("");

  const history = useHistory();

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const handleSearch = () => {
    history.push("/results?query=" + query);
    setQuery("");
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Menu size="small" inverted pointing stackable>
      <Menu.Item header name="home">
        <Icon className="headericons" color="green" name="film" size="big" />
        What To Watch?
      </Menu.Item>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={NavLink}
        to="/"
        exact>
        <Icon className="headericons" color="green" name="video" />
        Movie Hub
      </Menu.Item>
      <Menu.Item
        name="tvhub"
        active={activeItem === "tvhub"}
        onClick={handleItemClick}
        as={NavLink}
        to="/tvhub">
        <Icon className="headericons" color="green" name="video play" />
        TV Hub
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Form size='small' inverted onSubmit={handleSearch} >
            <Form.Group style={{marginBottom: 0}}>
              <Form.Input
                inverted
                type="text"
                name='search'
                placeholder="Movie/TV/Person..."
                value={query}
                onChange={handleInputChange}>
              </Form.Input>
              <Form.Button
                  type="submit"
                  inverted
                  color="green"
                  disabled={query.length === 0}>
                  Search
                </Form.Button>
            </Form.Group>
          </Form>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default MenuNavbar;
