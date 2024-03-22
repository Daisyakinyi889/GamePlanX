import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { createGame, createParticipant, filterGames, getGames as getGamesList,
   getParticipants as getParticipantsList, 
   searchGames,
   searchParticipants} from '../utils/marketplace';
import {Row, Table} from 'react-bootstrap'
import { NotificationError, NotificationSuccess } from "../components/utils/Notifications";
import AddGame from "../components/games/AddGame";
import AddParticipant from "../components/participants/AddParticipant";
import Loader from "../components/utils/Loader";
import GameCard from "../components/games/GameCard";
import ParticipantCard from "../components/participants/ParticipantCard";
import FilterSection from "../components/games/FilterSection";

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [participants, setParticipants] = useState([]);
  console.log("part", participants);

  const getGames = useCallback(async () => {
    try {
      setLoading(true);
      setGames(await getGamesList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  } , []);

  const getParticipants = useCallback(async () => {
    try {
      setLoading(true);
      setParticipants(await getParticipantsList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, []);

  const addGame = async (data) => {
    try {
      setLoading(true);
      createGame(data).then((resp) => {
        getGames();
      });
      toast(<NotificationSuccess text="Game added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create an Game." />);
    } finally {
      setLoading(false);
    }
  };

  const addParticipant = async (data) => {
    try {
      setLoading(true);
      createParticipant(data).then((resp) => {
        getParticipants();
      });
      toast(<NotificationSuccess text="Participant added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create an Participant." />);
    } finally {
      setLoading(false);
    }
  };

  // handleSearchGame
  const handleSearchGame = async (search) => {
    try {
      setLoading(true);
      await searchGames(search).then((resp) => {
        setGames(resp.Ok);
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  // handleSearchParticipant
  const handleSearchParticipant = async (search) => {
    try {
      setLoading(true);
      await searchParticipants(search).then((resp) => {
        setParticipants(resp.Ok);
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  // filterByCategory
  const filterByCategory = async (category) => {
    try {
      setLoading(true);
      setGames(await filterGames(category));
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGames();
    getParticipants();
  }, []);
  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
              <AddGame save={addGame} />
              <AddParticipant save={addParticipant} />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
              <FilterSection handleSearchGame={handleSearchGame}
               handleSearchParticipant={handleSearchParticipant} filterByCategory={filterByCategory} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
              {games.map((_game, index) => (
                  <GameCard
                  key={index} 
                  game={{..._game}} 
                  />
              ))}
          </Row>
          <h2 className="text-center">Participants</h2>

          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
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
              {participants && participants.map((_participant, index) => (
                  <ParticipantCard
                  key={index} 
                  participant={{..._participant}} />
              ))}
            </Table>

          </Row>

        </>
        ) : (
          <Loader />
        )
        }
    </>
  )
}

export default Home