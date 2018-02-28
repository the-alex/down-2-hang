import React from 'react';
import {Container, Menu, Image} from 'semantic-ui-react';

const Header = () => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item href='/' a='a' header>
        <Image
          size='tiny'
          src='/logo.png'
          style={{marginRight: '1.5em'}}
        />
        Down2Hang
      </Menu.Item>
      <Menu.Item floated='right' href='/logout' as='a'>Logout</Menu.Item>
    </Container>
  </Menu>
)

export default Header;
