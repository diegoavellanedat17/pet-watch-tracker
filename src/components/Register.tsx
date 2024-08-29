import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import PhoneInputField from "./PhoneInputField";
import "./Register.css";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phone: string) => {
    setFormData({ ...formData, phoneNumber: `+${phone}` });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.petwatch.tech/register",
        formData
      );
      setIsVerificationSent(true);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Error during registration. Please try again.");
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("https://api.petwatch.tech/verificate-code", {
        username: formData.email,
        code: verificationCode,
      });

      const loginResponse = await axios.post(
        "https://api.petwatch.tech/login",
        {
          username: formData.email,
          password: formData.password,
        }
      );

      const { accessToken, idToken, refreshToken } =
        loginResponse.data.data.AuthenticationResult;

      console.log("the info", { accessToken, idToken, refreshToken });

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("refreshToken", refreshToken);

      setShowSuccess(true);
      setError(null);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Error during verification. Please try again.");
    }
  };

  return (
    <Container className="register-container">
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="text-center light-color-text">Registro</h2>
          {!isVerificationSent ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label className="light-color-text">
                  Nombre de usuario
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Ingresa el nombre de usuario"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label className="light-color-text">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Ingresa la contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label className="light-color-text">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Ingresa el email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="phoneNumber" className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <PhoneInputField
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                />
              </Form.Group>
              {error && <Alert variant="danger">{error}</Alert>}

              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleVerification}>
              <Form.Group controlId="verificationCode" className="mb-3">
                <Form.Label className="light-color-text">
                  Verification Code
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}
              {showSuccess && (
                <Alert variant="success">Registration complete!</Alert>
              )}

              <Button variant="primary" type="submit" className="w-100">
                Verify
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
