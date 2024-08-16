import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Dashboard.css";
const Dashboard: React.FC = () => {
  return (
    <Container className="dashboard-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h1 className="text-center mb-4">Dashboard</h1>
              <p className="text-center">Welcome to your dashboard!</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
