import React from 'react';
import {Container, Menu, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Auth from './Auth.js';

// TODO: Link items only trigger if text is clicked, even though the whole box
// lights up
// TODO: Warning: <a> cannot appear as a descendant of <a>, error with link structure.
const Header = () => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item header>
        <Image size="tiny" src="/logo.png" style={{marginRight: '1.5em'}} />
        <Link to="/">Down2Hang</Link>
      </Menu.Item>
      {Auth.isAuthenticated() ? (
        <Menu.Item as="span" floated="right" onClick={() => Auth.logout()}>
          <Link to="/login">Logout</Link>
        </Menu.Item>
      ) : (
        <Menu.Item floated="right">
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
    </Container>
  </Menu>
);

export default Header;
