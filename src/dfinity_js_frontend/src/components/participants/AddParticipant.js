import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddParticipant = ({save}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [interest, setInterest] = useState("");

    const isFormFilled = () => name && email && phone && address && interest;


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
        <Button
            onClick={handleShow}
            variant="dark"
            
        >
            Add Participant
        </Button>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>New Participant</Modal.Title>
            </Modal.Header>
            <Form>
            <Modal.Body>
                <FloatingLabel
                controlId="inputName"
                label="Name"
                className="mb-3"
                >
                <Form.Control
                    type="text"
                    onChange={(e) => {
                    setName(e.target.value);
                    }}
                    placeholder="Enter name of participant"
                />
                </FloatingLabel>
                <FloatingLabel
                controlId="inputEmail"
                label="Email"
                className="mb-3"
                >
                <Form.Control
                    type="text"
                    placeholder="Email"
                    onChange={(e) => {
                    setEmail(e.target.value);
                    }}
                />
                </FloatingLabel>
                <FloatingLabel
                controlId="inputPhone"
                label="Phone"
                className="mb-3"
                >
                <Form.Control
                    type="text"
                    placeholder="Phone"
                    onChange={(e) => {
                    setPhone(e.target.value);
                    }}
                />
                </FloatingLabel>
                <FloatingLabel
                controlId="inputAddress"
                label="Address"
                className="mb-3"
                >
                <Form.Control
                    type="text"
                    placeholder="Address"
                    onChange={(e) => {
                    setAddress(e.target.value);
                    }}
                />
                </FloatingLabel>
                <FloatingLabel
                controlId="inputInterest"
                label="Interest"
                className="mb-3"
                >
                <Form.Control
                    type="text"
                    placeholder="Interest"
                    onChange={(e) => {
                    setInterest(e.target.value);
                    }}
                />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button
                variant="secondary"
                onClick={handleClose}
                >
                Close
                </Button>
                <Button
                variant="primary"
                disabled={!isFormFilled()}
                onClick={() => {
                    save({ name, email, phone, address, interest });
                    handleClose();
                    
                }}
                >
                Save
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
    </>
  )
}

export default AddParticipant