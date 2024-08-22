import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logoWhite.png";
import "./Navbar.css";

const NavigationBar: React.FC = () => {
  return (
    <Navbar
      expand="lg"
      className="p-3 fixed-top navbar-custom"
      style={{
        backgroundColor: "var(--background-color)",
      }}
    >
      <LinkContainer to="/">
        <Navbar.Brand>
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <LinkContainer to="/history">
            <Nav.Link
              className="nav-link-padding"
              style={{ color: "var(--text-color)" }}
            >
              History
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/register">
            <Nav.Link
              className="nav-link-padding"
              style={{ color: "var(--text-color)" }}
            >
              Register
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
