import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./JoinUs.css";

const JoinUs: React.FC = () => {
  const [contributionType, setContributionType] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Tipo de contribución:", contributionType);
    console.log("Correo electrónico:", email);
    // Reset form fields after submission
    setContributionType("");
    setEmail("");
  };

  return (
    <div className="join-us-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>¡Únete a PetWatch!</h2>
          <p>
            PetWatch es un proyecto open source y nos encantaría contar con tu
            participación. Selecciona cómo te gustaría contribuir y déjanos tu
            correo electrónico para ponernos en contacto contigo.
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="contribution" className="mb-3">
              <Form.Label className="input-label">
                Quiero contribuir en:
              </Form.Label>
              <Form.Control
                as="select"
                value={contributionType}
                onChange={(e) => setContributionType(e.target.value)}
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="desarrollo">Desarrollo</option>
                <option value="usar">Usar el producto</option>
                <option value="invertir">Invertir</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="input-label">
                Correo Electrónico:
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="tuemail@dominio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default JoinUs;
