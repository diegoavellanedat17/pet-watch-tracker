import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo1.png";

const NavigationBar: React.FC = () => {
  return (
    <Navbar
      expand="lg"
      className="p-3 fixed-top"
      style={{
        backgroundColor: "var(--background-color)",
      }}
    >
      <LinkContainer to="/">
        <Navbar.Brand>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/">
            <Nav.Link style={{ color: "var(--text-color)" }}>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/history">
            <Nav.Link style={{ color: "var(--text-color)" }}>History</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
