import { Card, Col, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { Pet } from "../types";
import { QRCodeCanvas } from "qrcode.react";
import { FaQrcode } from "react-icons/fa";
import dogAvatar from "../assets/dogAvatar.jpg";
import catAvatar from "../assets/catAvatar.jpg";
import { breedOptions, typeOptions, getLabelForValue } from "../utils";

const calculateAge = (bornDate?: Date): string => {
  if (!bornDate) return "Unknown";

  const today = new Date();
  const birthDate = new Date(bornDate);

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += previousMonth.getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  if (ageYears > 0) {
    return `${ageYears} years${ageMonths > 0 ? `, ${ageMonths} months` : ""}`;
  } else if (ageMonths > 0) {
    return `${ageMonths} months${ageDays > 0 ? `, ${ageDays} days` : ""}`;
  } else if (ageDays > 0) {
    return `${ageDays} days`;
  } else {
    return "Just born";
  }
};

const PetCard = ({
  pet,
  onEdit,
}: {
  pet: Pet;
  onEdit: (pet: Pet) => void;
}): JSX.Element => {
  const [showQRModal, setShowQRModal] = useState(false);

  const handleQRClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from firing
    setShowQRModal(true);
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
  };

  const avatar = pet.imageUrl
    ? pet.imageUrl
    : pet.type === "cat"
    ? catAvatar
    : dogAvatar;

  return (
    <Col>
      <Card className="position-relative" onClick={() => onEdit(pet)}>
        <Card.Img variant="top" src={avatar} alt={pet.name} />
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <Card.Text>
            <strong>Type:</strong> {getLabelForValue(pet.type, typeOptions)}{" "}
            <br />
            <strong>Breed:</strong> {getLabelForValue(pet.breed, breedOptions)}{" "}
            <br />
            <strong>Age:</strong> {calculateAge(pet.bornDate)}
          </Card.Text>
        </Card.Body>
        <Button
          variant="primary"
          className="rounded-circle"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleQRClick} // This stops the event from propagating to the card click
        >
          <FaQrcode style={{ fontSize: "1.5rem" }} />
        </Button>

        {/* Modal to display QR code */}
        <Modal show={showQRModal} onHide={handleCloseQRModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Pet QR Code</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <QRCodeCanvas value={pet._id} size={256} />
            <p className="mt-3">Scan this QR code to get the pet ID.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseQRModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </Col>
  );
};

export default PetCard;
