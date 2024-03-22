import React from "react";
import PropTypes from "prop-types";
import DeleteParticipant from "./DeleteParticipant";

const ParticipantCard = ({participant}) => {

    const { id, name, email, phone, address, interest } = participant;

  return (
    
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
  )
}

export default ParticipantCard