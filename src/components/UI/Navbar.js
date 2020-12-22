import React from  'react';
import {Navbar} from 'react-bootstrap';

function NavbarFood() {
  return(
    <Navbar style={{zIndex: 1 }} fixed="top" bg="light">
  <Navbar.Brand href="/"><span style={{color: '#ff0157'}}>F</span>oodied</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
      Signed in as: <a href="#login">Mark Otto</a>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
  );
};


export  default NavbarFood;
