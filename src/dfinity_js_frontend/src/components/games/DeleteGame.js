import React from 'react'
import { deleteGame } from '../../utils/marketplace';
import { toast } from 'react-toastify';
import {Button} from 'react-bootstrap'
import { NotificationError, NotificationSuccess } from '../utils/Notifications';


const DeleteGame = ({gameId}) => {
    const removeGame = async () => {
        try {
            deleteGame(gameId).then(() => {
                toast(<NotificationSuccess text="Game deleted successfully." />);
                window.location.reload();
            }).catch((error) => {
                toast(<NotificationError text="Failed to delete a Game." />);
            })
        } catch (error) {
            console.log({error});
            toast.error("Failed to delete Game");
        }
    }
  return (
    <Button variant="danger" 
    className="rounded-pill px-0"
    style={{ width: "38px" }}
    onClick={() => {
        removeGame();
    }}> <i  className="bi bi-trash"></i>
    </Button>
  )
}

export default DeleteGame