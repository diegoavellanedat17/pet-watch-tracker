import { Card, Col, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { Pet } from "../types";
import { QRCodeCanvas } from "qrcode.react";
import { FaQrcode } from "react-icons/fa";

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

  return (
    <Col>
      <Card className="position-relative" onClick={() => onEdit(pet)}>
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
