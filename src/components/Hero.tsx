import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Hero.css";
import hero from "../assets/heroTest.png";

const Hero: React.FC = () => {
  return (
    <div className="hero-section">
      <Container fluid className="p-0 mt-5 hero-container">
        <Row className="m-0 align-items-center">
          <Col md={6} className="p-5 ">
            <h1 className="hero-title display-4">PetWatch</h1>
            <p className="hero-subtitle lead">
              Una app para que hagas seguimiento de tu mascota con un celular
              viejo!
            </p>
            <Button
              variant="primary"
              className="rounded-pill download-button"
              href="https://play.google.com/store"
              target="_blank"
            >
              Descargar App
            </Button>
          </Col>

          <Col md={6} className="p-0">
            <div className="hero-image-container position-relative">
              <img
                src={hero}
                alt="Hero"
                className="img-fluid d-lg-none w-100 h-100 hero-image"
              />
              <img
                src={hero}
                alt="Hero"
                className="img-fluid d-none d-lg-block w-100 h-100 hero-desktop-image"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
