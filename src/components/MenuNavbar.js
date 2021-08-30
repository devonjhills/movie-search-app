import React from "react";
import "../App.css";
import { Button, Icon, Menu } from "semantic-ui-react";

const MenuNavbar = () => {

  const d = new Date();

  return (
    <Menu inverted>
      <Menu.Item header name="home">
        <Icon className="headericons" name="film" size="big" />
        What To Watch?
      </Menu.Item>
      <Menu.Item name="new releases">
        <Button icon inverted>
          <Icon className="headericons" name="fire" />
          Now Playing
        </Button>
      </Menu.Item>
      <Menu.Item name="search" >
      <Button icon inverted>
          <Icon className="headericons" name="video play" />
          Search
        </Button>
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
