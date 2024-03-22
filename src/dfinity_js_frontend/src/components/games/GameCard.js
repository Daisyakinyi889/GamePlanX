import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";
import DeleteGame from "./DeleteGame";
import InsertParticipant from "./InsertParticipant";
import RemoveParticipant from "./RemoveParticipant";

const GameCard = ({game}) => {
    const { id, title, description, organiser, 
        category, startDate, endDate, location, participants } = game;


  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{organiser}</span>
            <Badge bg="secondary" className="ms-auto">
              {participants.length} Participants
            </Badge>
          </Stack>
        </Card.Header>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{title}</Card.Title>
          <Card.Text className="flex-grow-1 ">{description}</Card.Text>
          <Card.Text className="text-secondary">
            <span>{category}</span>
          </Card.Text>
          <Card.Text className="text-secondary">
            <span>{startDate}</span>
          </Card.Text>
          <Card.Text className="text-secondary">
            <span>{endDate}</span>
          </Card.Text>
          <Card.Text className="text-secondary">
            <span>{location}</span>
          </Card.Text>
          {/* Add participants name as a list from participants array  use badge*/}
          <Card.Text className="text-secondary">
            <span>Participants: </span>
            {participants ? participants.map((participant, index) => (
              <Badge key={index} bg="secondary" className="ms-1">
                {participant.name}
              </Badge>
            )) : "No Participants"}
          </Card.Text>      

            <div className="d-flex justify-content-end">
                <InsertParticipant gameId={id} />
                <RemoveParticipant gameId={id} />
            </div>
            

          <div className="d-flex justify-content-end mt-2">
            <DeleteGame gameId={id} />
            </div>
        </Card.Body>
      </Card>
    </Col>
  );
  
}

export default GameCard