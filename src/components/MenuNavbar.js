import React, { useState } from "react";
import "../App.css";
import { Icon, Image, Menu } from "semantic-ui-react";
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
      <Menu.Menu position="right">
        <div className='center'>
          <span className="mygradient">Powered By</span>
          <Image
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            as="a"
            size="small"
            href="https://www.themoviedb.org/"
          />
        </div>
      </Menu.Menu>
    </Menu>
  );
};

export default MenuNavbar;
