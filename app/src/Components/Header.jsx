import React from 'react';
import { Navbar, Container, NavbarBrand, NavLink, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar expand='lg'>
      <Container>
        <NavbarBrand href='/' >Rockers Interview</NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='ms-auto' >
            <NavLink href='/' >Home</NavLink>
            <NavLink href='/login'>Login</NavLink>
            <NavLink href='signup'>Register</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
