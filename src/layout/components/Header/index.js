import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { constants } from '../../../utils/constants'
import NavLink from '../../../components/NavLink'


const authenticatedOptions = (
  <>
    <NavLink path="#my-projects" title={constants.MY_PROJECTS}/>
    <NavDropdown title="Authorization" id="nav-dropdown">
      <Nav.Link href="#change-password">Change Password</Nav.Link>
      <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    </NavDropdown>
  </>
)

const unauthenticatedOptions = (
  <>
    <Nav.Link href="/">Login</Nav.Link>
  </>
)

const Header = ({ user }) => (
  <div>
    <Navbar expand="md">
      <Navbar.Brand href="/">
       Rapic.io
      </Navbar.Brand>
      <NavLink path="deneme" title="Features"/>
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
