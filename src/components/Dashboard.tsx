import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Pet } from "../types";
import axios from "axios";
import PetCard from "./PetCard";
import { FaPlus } from "react-icons/fa";
import "./Dashboard.css";

interface DashboardProps {
  username: string;
}

const Dashboard = ({ username }: DashboardProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [petData, setPetData] = useState({
    name: "",
    age: "",
    type: "",
    breed: "",
  });
  const [pets, setPets] = useState<Pet[]>([]);

  const fetchPets = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get("https://api.petwatch.tech/pets", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response && response.data) {
        setPets(response.data);
      } else {
        setPets([]);
      }
    } catch (error) {
      console.error("Error fetching pets", error);
      setPets([]);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleCreatePet = () => {
    setModalMode("create");
    setPetData({
      name: "",
      age: "",
      type: "",
      breed: "",
    });
    setShowModal(true);
  };

  const handleEditPet = (pet: Pet) => {
    setModalMode("update");
    console.log(pet);
    setSelectedPet(pet);
    setPetData({
      name: pet.name,
      age: pet.age.toString(),
      type: pet.type,
      breed: pet.breed,
    });
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

      if (modalMode === "create") {
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
          fetchPets();
        }
      } else if (modalMode === "update" && selectedPet) {
        console.log("the pet id", selectedPet);
        const response = await axios.put(
          `https://api.petwatch.tech/pet/${selectedPet._id}`,
          { ...petData },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Pet updated successfully");
          fetchPets();
        }
      }

      handleCloseModal();
    } catch (error) {
      alert("Failed to save pet. Please try again.");
    }
  };

  const handleDeletePet = async () => {
    try {
      if (selectedPet) {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.delete(
          `https://api.petwatch.tech/pet/${selectedPet._id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Pet deleted successfully");
          fetchPets();
          handleCloseModal();
        }
      }
    } catch (error) {
      alert("Failed to delete pet. Please try again.");
    }
  };

  return (
    <Container className="dashboard-container">
      <Row className="justify-content-between align-items-center">
        <Col md={8}>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-white mb-0">Bienvenido, {username}</h1>
            <Button
              variant="primary"
              onClick={handleCreatePet}
              className="rounded-circle"
              style={{ width: "40px", height: "40px" }}
            >
              <FaPlus />
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        {pets.map((pet) => (
          <Col key={pet._id} md={4} className="mb-4">
            {" "}
            {/* Ensure md={4} is applied */}
            <div
              onClick={() => handleEditPet(pet)}
              style={{ minWidth: "700px", padding: "20px" }}
            >
              <PetCard pet={pet} />
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "create" ? "Create a New Pet" : "Update Pet"}
          </Modal.Title>
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
          {modalMode === "update" && (
            <Button variant="danger" onClick={handleDeletePet}>
              Delete Pet
            </Button>
          )}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {modalMode === "create" ? "Save Pet" : "Update Pet"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
