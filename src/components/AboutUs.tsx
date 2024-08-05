import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./AboutUs.css";

const AboutUs: React.FC = () => {
  return (
    <Container className="about-us-container text-center mt-5">
      <Row>
        <Col>
          <h2 className="about-title">About Us</h2>
          <p className="about-description">
            Identifica actividad física, lugar en tiempo real, horas de mayor
            actividad. Descarga la app en Play Store e instala en la pechera de
            tu perro.
          </p>
          <p className="status">Proyecto en construcción.</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Image
            src="https://via.placeholder.com/400x300?text=Perro+1"
            rounded
            className="pet-image"
          />
        </Col>
        <Col>
          <Image
            src="https://via.placeholder.com/400x300?text=Perro+2"
            rounded
            className="pet-image"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
