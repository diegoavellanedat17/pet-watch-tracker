import React from "react";
import { Card, Col } from "react-bootstrap";

interface Pet {
  id: string;
  name: string;
  age: number;
  type: string;
  breed: string;
  imageUrl: string | null;
}

const PetCard = ({ pet }: { pet: Pet }): JSX.Element => {
  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Img
          variant="top"
          src={pet.imageUrl || "https://via.placeholder.com/150"}
          alt={pet.name}
        />
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <Card.Text>
            <strong>Type:</strong> {pet.type} <br />
            <strong>Breed:</strong> {pet.breed} <br />
            <strong>Age:</strong> {pet.age} years
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PetCard;
