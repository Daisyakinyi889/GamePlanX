import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

export async function createGame(game) {
  return window.canister.marketplace.addGame(game);
}

export async function getGames() {
  try {
    return await window.canister.marketplace.getGames();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getGame(id) {
  return window.canister.marketplace.getGame(id);
}


// update Game
export async function updateGame(game) {
  return window.canister.marketplace.updateGame(game);
}

// delete Game

export async function deleteGame(id) {
  return window.canister.marketplace.deleteGame(id);
}

//filter games by category
export async function filterGames(category) {
  return window.canister.marketplace.filterGamesByCategory(category);
}

// searchGames
export async function searchGames(search) {
  return window.canister.marketplace.searchGames(search);
}

// Insert Participant in the game
export async function insertParticipant(gameId, participantId) {
  return window.canister.marketplace.insertParticipant(gameId, participantId);
}

// removeParticipant from the game
export async function removeParticipant(gameId, participantId) {
  return window.canister.marketplace.removeParticipant(gameId, participantId);
}

// addParticipant
export async function createParticipant(participant) {
  return window.canister.marketplace.addParticipant(participant);
}

// updateParticipant
export async function updateParticipant( participant) {
  return window.canister.marketplace.updateParticipant(participant);
}

// deleteParticipant
export async function deleteParticipant( participantId) {
  return window.canister.marketplace.deleteParticipant(participantId);
}

// getParticipants
export async function getParticipants() {
  return window.canister.marketplace.getParticipants();
}

// getParticipant
export async function getParticipant( participantId) {
  return window.canister.marketplace.getParticipant(participantId);
}

// searchParticipants
export async function searchParticipants(searchTerm) {
  return window.canister.marketplace.searchParticipants(searchTerm);
}

// getGameParticipants
export async function getGameParticipants(gameId) {
  return window.canister.marketplace.getGameParticipants(gameId);
}

// getNoOfParticipants
export async function getNoOfParticipants(gameId) {
  return window.canister.marketplace.getNoOfParticipants(gameId);
}


