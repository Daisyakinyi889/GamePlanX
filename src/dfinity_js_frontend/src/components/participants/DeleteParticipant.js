import React from 'react'
import { deleteParticipant } from '../../utils/marketplace';

const DeleteParticipant = ({participantId}) => {

    const removeParticipant = async () => {
        try {
            deleteParticipant(participantId).then(() => {
                toast(<NotificationSuccess text="Participant deleted successfully." />);
                window.location.reload();
            }).catch((error) => {
                toast(<NotificationError text="Failed to delete a Participant." />);
            })
        } catch (error) {
            console.log({error});
            toast.error("Failed to delete Participant");
        }
    }
  return (
    <Button variant="danger" 
    className="rounded-pill px-0"
    style={{ width: "38px" }}
    onClick={() => {
        removeParticipant();
    }}> <i  className="bi bi-trash"></i>
    </Button>
  )
}

export default DeleteParticipant