import React, { useState } from 'react'
import { Row,  Button, Col,Form, InputGroup } from "react-bootstrap";

const FilterSection = ({handleSearchGame,handleSearchParticipant, filterByCategory}) => {
    const [category, setCategory] = useState("");
    const [searchGame, setSearchGame] = useState("");
    const [search, setSearch] = useState("");

  return (
    <Row className="justify-content-between mt-1 align-items-center">
        <Col xs={12} sm={6} md={4} lg={3} className="d-flex ">
        <InputGroup className="mb-3">
            <Form.Control
                type="text"
                placeholder="Search Game"
                onChange={(e) => {
                    setSearchGame(e.target.value);
                }}
            />
            <Button variant="dark" id="button-addon2"
                onClick={() => {
                    handleSearchGame(searchGame);
                }}  
            >
                <i className="bi bi-search"></i>
            </Button>
        </InputGroup>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3} className="d-flex">
        <InputGroup className="mb-3">
            <Form.Control
                type="text"
                placeholder="Search Participant"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <Button variant="dark" id="button-addon2"
                onClick={() => {
                    handleSearchParticipant(search);
                }}  
            >
                <i className="bi bi-search"></i>
            </Button>
        </InputGroup>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="d-flex">
        <InputGroup className="mb-3">
            <Form.Control
                type="text"
                placeholder="Category"
                onChange={(e) => {
                    setCategory(e.target.value);
                }}
            />
            <Button variant="dark" id="button-addon2"
                onClick={() => {
                    filterByCategory(category);
                }}  
            >
                <i className="bi bi-filter"></i>
            </Button>
        </InputGroup>
        </Col>
    </Row>




  )
}

export default FilterSection