import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddGame = ({save}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [organiser, setOrganiser] = useState("");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [location, setLocation] = useState("");

    const isFormFilled = () => title && description && organiser && category && startDate && endDate && location;



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        
      >
        Add Game
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Game</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputName"
              label="Game Title"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Enter title of game"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputOrganiser"
              label="Organiser"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Organiser"
                onChange={(e) => {
                  setOrganiser(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputCategory"
              label="Category"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputStartDate"
              label="Start Date"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Start Date"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputEndDate"
              label="End Date"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="End Date"
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputLocation"
              label="Location"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              disabled={!isFormFilled()}
              onClick={() => {
                save({title, description, organiser, category, startDate, endDate, location});
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

export default AddGame