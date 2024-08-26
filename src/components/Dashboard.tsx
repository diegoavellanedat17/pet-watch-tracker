import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCreatePet = () => {
    navigate("/create-pet"); // Adjust the path to where the Create Pet form is located
  };

  return (
    <Container className="dashboard-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h1 className="text-center mb-4">Dashboard</h1>
              <p className="text-center">Welcome to your dashboard!</p>
              <div className="text-center mt-4">
                <Button variant="primary" onClick={handleCreatePet}>
                  Create Pet
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
