import React from "react";
import PropTypes from "prop-types";
import { Table} from "react-bootstrap";
import DeleteParticipant from "./DeleteParticipant";

const ParticipantCard = ({participant}) => {

    const { id, name, email, phone, address, interest } = participant;

  return (
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Interest</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{address}</td>
                <td>{interest}</td>
                <td>
                    <DeleteParticipant  participantId={id} />
                </td>
            </tr>
        </tbody>
    </Table>
  )
}

export default ParticipantCard