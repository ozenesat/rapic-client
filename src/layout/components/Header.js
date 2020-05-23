import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from './Logo-nobg.ico'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="my-projects">My Projects</Nav.Link>
    <NavDropdown title="Authorization" id="nav-dropdown">
      <Nav.Link href="change-password">Change Password</Nav.Link>
      <Nav.Link href="sign-out">Sign Out</Nav.Link>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="sign-up">Login</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <div>
    <Navbar expand="md">
      <Navbar.Brand href="/">
       <img src={logo} style={{ width: '5em', height: '1em' }} className="App-logo" alt="logo" />
      </Navbar.Brand>
      <Nav.Link href="deneme">Features</Nav.Link>
      <Nav.Link href="deneme">Pricing</Nav.Link>
      <Nav.Link href="deneme">Docs</Nav.Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { user ? authenticatedOptions : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
)

export default Header
