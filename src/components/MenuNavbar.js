import React, { useState } from "react";
import "../App.css";
import { Icon, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const MenuNavbar = () => {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu inverted pointing>
      <Menu.Item header name="home">
        <Icon className="headericons" name="film" size="big" />
        What To Watch?
      </Menu.Item>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={NavLink}
        to="/"
        exact
      >
        <Icon className="headericons" name="video" />
        Movie Hub
      </Menu.Item>
      <Menu.Item
        name="tvhub"
        active={activeItem === "tvhub"}
        onClick={handleItemClick}
        as={NavLink}
        to="/tvhub"
      >
        <Icon className="headericons" name="video play" />
        TV Hub
      </Menu.Item>
    </Menu>
  );
};

export default MenuNavbar;
