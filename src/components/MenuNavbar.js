import React, { useState } from "react";
import "../App.css";
import { Icon, Menu, Form, Button } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";

const MenuNavbar = () => {
  const [query, setQuery] = useState("");

  const history = useHistory();

  const handleSearch = () => {
    history.push("/results?query=" + query);
    setQuery("");
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Menu size="small" inverted secondary stackable>
      <Menu.Item header name="home" style={{marginLeft: '10px'}}>
        <Icon className="headericons" name="film" size="big" />
        <span className='mygradient'>What To Watch?</span>
      </Menu.Item>
      <Menu.Item>
        <Button as={Link} to="/" inverted basic>
          <Icon className="headericons" name="video" />
          <span className='mygradient'>Movie Hub</span>
        </Button>
      </Menu.Item>
      <Menu.Item>
      <Button as={Link} to="/tvhub" inverted basic>
          <Icon className="headericons" name="tv" />
          <span className='mygradient'>TV Hub</span>
        </Button>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Form size="small" inverted onSubmit={handleSearch}>
            <Form.Group style={{ marginBottom: 0 }}>
              <Form.Input
                inverted
                type="text"
                name="search"
                placeholder="Movie/TV/Person..."
                value={query}
                onChange={handleInputChange}></Form.Input>
              <Form.Button
                type="submit"
                inverted
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
