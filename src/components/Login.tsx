// src/components/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "./Login.css";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://api.petwatch.tech/login", {
        username: formData.username,
        password: formData.password,
      });
      const { accessToken, idToken, refreshToken } =
        response.data.data.AuthenticationResult;

      // Store tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
