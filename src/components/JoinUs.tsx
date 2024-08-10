import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "./JoinUs.css";

const JoinUs: React.FC = () => {
  const [contributionType, setContributionType] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapContributionType = (type: string): string => {
    switch (type) {
      case "desarrollo":
        return "DEVELOPER";
      case "usar":
        return "USER";
      case "invertir":
        return "INVESTOR";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const mappedType = mapContributionType(contributionType);

    if (!mappedType) {
      setError("Tipo de contribución no válido.");
      setShowSuccess(false);
      return;
    }

    try {
      const username = process.env.BASIC_AUTH_USERNAME || "admin";
      const password = process.env.BASIC_AUTH_PASSWORD || "password";
      const token = btoa(`${username}:${password}`);

      const response = await axios.post(
        "https://api.petwatch.tech/join-us",
        {
          name,
          phone,
          email,
          type: mappedType,
        },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setShowSuccess(true);
        setError(null);
        setName("");
        setPhone("");
        setContributionType("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setError(
        "Hubo un problema al enviar la solicitud. Por favor, inténtalo de nuevo."
      );
      setShowSuccess(false);
    }
  };

  return (
    <Container className="join-us-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>¡Únete a PetWatch!</h2>
          <p>
            PetWatch es un proyecto open source y nos encantaría contar con tu
            participación. Selecciona cómo te gustaría contribuir y déjanos tu
            correo electrónico para ponernos en contacto contigo.
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label className="input-label">Nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="phone" className="mb-3">
              <Form.Label className="input-label">Teléfono:</Form.Label>
              <Form.Control
                type="text"
                placeholder="123-456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>

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
                placeholder="tuemail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {showSuccess && (
              <Alert variant="success">¡Pronto te contactaremos!</Alert>
            )}

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default JoinUs;
