import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Pet } from "../types";
import axios from "axios";
import PetCard from "./PetCard";
import Select from "react-select";
import { FaPlus } from "react-icons/fa";
import { breedOptions, typeOptions } from "../utils";
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
    bornDate: "",
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
      bornDate: "",
      type: "",
      breed: "",
    });
    setShowModal(true);
  };

  const handleEditPet = (pet: Pet) => {
    setModalMode("update");
    setSelectedPet(pet);

    setPetData({
      name: pet.name,
      bornDate: pet.bornDate
        ? new Date(pet.bornDate).toISOString().substring(0, 10)
        : "",
      type: pet.type,
      breed: pet.breed,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTypeChange = (selectedOption: any) => {
    setPetData((prevData) => ({
      ...prevData,
      type: selectedOption.value,
    }));
  };

  const handleBreedChange = (selectedOption: any) => {
    setPetData((prevData) => ({
      ...prevData,
      breed: selectedOption.value,
    }));
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
        <Col xs={8}>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-white mb-0">Bienvenido, {username}</h1>
          </div>
        </Col>
        <Col xs={2}>
          <Button
            variant="primary"
            onClick={handleCreatePet}
            className="rounded-circle"
            style={{ width: "40px", height: "40px" }}
          >
            <FaPlus />
          </Button>
        </Col>
      </Row>

      <Row className="mt-5">
        {pets.map((pet) => (
          <Col key={pet._id} md={3} className="mb-4">
            <PetCard pet={pet} onEdit={handleEditPet} />
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
            <Form.Group controlId="formPetBornDate">
              <Form.Label>Born Date</Form.Label>
              <Form.Control
                type="date"
                name="bornDate"
                value={petData.bornDate || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPetType">
              <Form.Label>Type</Form.Label>
              <Select
                options={typeOptions}
                value={typeOptions.find(
                  (option) => option.value === petData.type
                )}
                onChange={handleTypeChange}
                placeholder="Select type (Dog or Cat)"
              />
            </Form.Group>
            <Form.Group controlId="formPetBreed">
              <Form.Label>Breed</Form.Label>
              <Select
                options={breedOptions}
                value={breedOptions.find(
                  (option) => option.value === petData.breed
                )}
                onChange={handleBreedChange}
                placeholder="Select a breed"
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
          <Button variant="primary" onClick={handleSubmit}>
            {modalMode === "create" ? "Save Pet" : "Update Pet"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
