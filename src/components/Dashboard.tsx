import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import PetCard from "./PetCard"; // Import the PetCard component
import "./Dashboard.css";

interface DashboardProps {
  username: string;
}

interface Pet {
  id: string;
  name: string;
  age: number;
  type: string;
  breed: string;
  imageUrl: string | null;
  owner_id: string;
}

const Dashboard = ({ username }: DashboardProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [petData, setPetData] = useState({
    name: "",
    age: "",
    type: "",
    breed: "",
  });
  const [pets, setPets] = useState<Pet[]>([]); // State to hold pets data
  const fetchPets = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get("https://api.petwatch.tech/pets", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setPets(response.data.pets);
    } catch (error) {
      console.error("Error fetching pets", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleCreatePet = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        "https://api.petwatch.tech/pet",
        { ...petData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Pet created successfully");
        handleCloseModal();
        fetchPets();
      }
    } catch (error) {
      alert("Failed to create pet. Please try again.");
    }
  };

  return (
    <Container className="dashboard-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h1 className="text-center mb-4">Bienvenido</h1>
              <p className="text-center">{username}</p>
              <div className="text-center mt-4">
                <Button variant="primary" onClick={handleCreatePet}>
                  Create Pet
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPetName">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet name"
                name="name"
                value={petData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPetAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter pet age"
                name="age"
                value={petData.age}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPetType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet type (e.g., Dog, Cat)"
                name="type"
                value={petData.type}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPetBreed">
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet breed"
                name="breed"
                value={petData.breed}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Pet
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
