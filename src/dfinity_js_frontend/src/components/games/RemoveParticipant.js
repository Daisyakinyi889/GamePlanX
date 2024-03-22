import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Table } from "react-bootstrap";
import { getParticipants as getParticipantsList, removeParticipant } from "../../utils/marketplace";
import { NotificationError, NotificationSuccess } from "../utils/Notifications";
import {toast} from 'react-toastify';

const RemoveParticipant = ({gameId}) => {

    const [participants, setParticipants] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getParticipants = useCallback(async () => {
        try {
            setParticipants(await getParticipantsList());
        } catch (error) {
            console.log({ error });
        } 
    });
    
    const handleRemoveParticipant = async (participantId) => {
        try {
            await removeParticipant(gameId, participantId);
            toast(<NotificationSuccess text="Participant removed from Game  successfully." />);
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Participant remove from Game not successfully." />);
        }
    }

    useEffect(() => {
        getParticipants();
    } , []);
  return (
    <>
         <Button
            variant="danger"
            className="mx-2 py-1"
            onClick={handleShow}

          >
            {/* Here remove Participant from Game */}
            Release
          </Button>
        <Modal show={show} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Remove Participant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Participant Name</th>
                    <th>Participant Email</th>
                    <th>Participant Phone</th>
                    <th>Participant Address</th>
                    <th>Participant Interest</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {participants.map((participant) => (
                        <tr key={participant.id}>
                            <td>{participant.name}</td>
                            <td>{participant.email}</td>
                            <td>{participant.phone}</td>
                            <td>{participant.address}</td>
                            <td>{participant.interest}</td>
                            <td>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => {
                                        handleRemoveParticipant(participant.id);
                                        handleClose();
                                    
                                    }}
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    </>

  )
}

export default RemoveParticipant