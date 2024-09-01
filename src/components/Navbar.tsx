import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logoWhite.png";
import "./Navbar.css";

interface NavigationBarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  isAuthenticated,
  onLogout,
}) => {
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
            width="40"
            height="40"
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
          {isAuthenticated ? (
            <>
              <LinkContainer to="/dashboard">
                <Nav.Link
                  className="nav-link-padding"
                  style={{ color: "var(--text-color)" }}
                >
                  My Dashboard
                </Nav.Link>
              </LinkContainer>
              <Nav.Link
                className="nav-link-padding"
                style={{ color: "var(--text-color)" }}
                onClick={onLogout}
              >
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <LinkContainer to="/register">
                <Nav.Link
                  className="nav-link-padding"
                  style={{ color: "var(--text-color)" }}
                >
                  Registro
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link
                  className="nav-link-padding"
                  style={{ color: "var(--text-color)" }}
                >
                  Ingresar
                </Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
