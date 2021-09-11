import React, { useState } from "react";
import "../App.css";
import { Icon, Input, Menu } from "semantic-ui-react";
import { NavLink, Redirect, useLocation } from "react-router-dom";

const MenuNavbar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [query, setQuery] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { pathname } = useLocation();

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const handleSearch = (e) => {
    setQuery("");
    setRedirect(true);
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  }

  console.log(pathname)

  if (redirect === true) {
    return <Redirect pathname={pathname} push to={`/search`} />;
  }

  return (
    <Menu size="small" inverted pointing>
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
      <Input
          id='queryInput'
          inverted
          type='text'
          size="large"
          action={{ icon: "search", onClick: handleSearch }}
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
        />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default MenuNavbar;
