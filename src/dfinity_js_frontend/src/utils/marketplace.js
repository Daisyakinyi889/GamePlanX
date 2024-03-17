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
export async function insertParticipant(gameId, participant) {
  return window.canister.marketplace.insertParticipant(gameId, participant);
}

// removeParticipant from the game
export async function removeParticipant(gameId, participant) {
  return window.canister.marketplace.removeParticipant(gameId, participant);
}

// addParticipant
export async function createParticipant(gameId, participant) {
  return window.canister.marketplace.addParticipant(gameId, participant);
}

// updateParticipant
export async function updateParticipant(gameId, participant) {
  return window.canister.marketplace.updateParticipant(gameId, participant);
}

// deleteParticipant
export async function deleteParticipant(gameId, participant) {
  return window.canister.marketplace.deleteParticipant(gameId, participant);
}

// getParticipants
export async function getParticipants(gameId) {
  return window.canister.marketplace.getParticipants(gameId);
}

// getParticipant
export async function getParticipant(gameId, participant) {
  return window.canister.marketplace.getParticipant(gameId, participant);
}

// searchParticipants
export async function searchParticipants(gameId, search) {
  return window.canister.marketplace.searchParticipants(gameId, search);
}

// getGameParticipants
export async function getGameParticipants(gameId) {
  return window.canister.marketplace.getGameParticipants(gameId);
}

// getNoOfParticipants
export async function getNoOfParticipants(gameId) {
  return window.canister.marketplace.getNoOfParticipants(gameId);
}


