import React from "react";
import "../App.css";
import { Button, Icon, Menu } from "semantic-ui-react";

const MenuNavbar = () => {
  return (
    <Menu inverted>
      <Menu.Item header name="home">
        <Icon className="headericons" name="film" size="big" />
        What To Watch?
      </Menu.Item>
      <Menu.Item name="trending now">
        <Button icon inverted color='green'>
          <Icon className="headericons" name="fire" />
          Trending Now
        </Button>
      </Menu.Item>
      <Menu.Item name="search" >
      <Button icon inverted color='green'>
          <Icon className="headericons" name="video play" />
          Search
        </Button>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="logout">
          <Icon className="headericons" name="log out" />
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default MenuNavbar;
