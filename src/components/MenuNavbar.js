import React, { useState } from "react";
import "../App.css";
import { Icon, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const MenuNavbar = () => {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const d = new Date();

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
        name="search"
        active={activeItem === "search"}
        onClick={handleItemClick}
        as={NavLink}
        to="/search"
      >
        <Icon className="headericons" name="video play" />
        TV Hub
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="date">
          <Icon className="headericons" name="calendar alternate outline" />
          {d.toLocaleDateString()}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default MenuNavbar;
