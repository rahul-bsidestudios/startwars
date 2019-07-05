import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import userActions from '../../actions/user.actions';
import { history } from '../../helpers/history';

class Header extends Component {

  handleLogout() {
    userActions.logout();
    history.push('/login');
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Star Wars</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#" onClick={this.handleLogout.bind(this)}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
