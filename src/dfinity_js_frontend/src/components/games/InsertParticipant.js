import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Table } from "react-bootstrap";
import { getParticipants as getParticipantsList, insertParticipant } from "../../utils/marketplace";
import { NotificationError, NotificationSuccess } from "../utils/Notifications";
import {toast} from 'react-toastify';

const InsertParticipant = ({gameId}) => {

    const [participants, setParticipants] = useState([]);
    const id = gameId;


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

    const handleInsertParticipant = async (participantId) => {
        try {
            await insertParticipant(id, participantId);
            toast(<NotificationSuccess text="Participant added to Game  successfully." />);

        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Participant add to Game not successfully." />);
        }
    }

    useEffect(() => {
        getParticipants();
    } , []);


  return (
    <>
         <Button
            variant="success"
            className="mx-2 py-1"
            onClick={handleShow}

          >
            {/* Here insert Participant to Game */}
            Join
          </Button>
        <Modal show={show} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Insert Participant</Modal.Title>
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
                            variant="outline-dark"
                            onClick={() => {
                            // insert participant to game
                                handleInsertParticipant(participant.id);
                                handleClose();
                            }}
                        >
                            Insert
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

export default InsertParticipant