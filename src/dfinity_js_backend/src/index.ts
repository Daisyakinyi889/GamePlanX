import { auto } from "@popperjs/core";
import { query, update, text, Record, StableBTreeMap, Variant, Vec, None, Some, Ok, Err, ic, Principal, Opt, nat64, Duration, Result, bool, Canister } from "azle";
import {
    Ledger, binaryAddressFromAddress, binaryAddressFromPrincipal, hexAddressFromPrincipal
} from "azle/canisters/ledger";
import { hashCode } from "hashcode";
import { v4 as uuidv4 } from "uuid";

const Participant = Record({
    id: text,
    name: text,
    email: text,
    phone: text,
    address: text,
    interest: text,
});

const Game = Record({
    id: text,
    title: text,
    description: text,
    organiser: text,
    category: text,
    startDate: text,
    endDate: text,
    location: text,
    participants: Vec(Participant),
});


// participant payload 
const ParticipantPayload = Record({
    name: text,
    email: text,
    phone: text,
    address: text,
    interest: text,
});

// Game payload
const GamePayload = Record({
    title: text,
    description: text,
    organiser: text,
    category: text,
    startDate: text,
    endDate: text,
    location: text,
});

const Message = Variant({
    NotFound: text,
    InvalidPayload: text,
    PaymentFailed: text,
    PaymentCompleted: text
});


const gameStorage = StableBTreeMap(0,text, Game)
const participantStorage =  StableBTreeMap(1,text, Participant)




/* 
    initialization of the Ledger canister. The principal text value is hardcoded because 
    we set it in the `dfx.json`
*/
const icpCanister = Ledger(Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"));

export default Canister({
    // Get all the Games
    getGames: query([], Vec(Game),() => {
        return gameStorage.values();
    }),
    // Get a Game by id
    getGame: query([text], Result(Game, Message), (id) => { 
        const gameOpt = gameStorage.get(id);
        if ("None" in gameOpt) {
            return Err({ NotFound: `game with id=${id} not found` });
        }
        return Ok(gameOpt.Some);
    }   
    ),
    // Filter the games by Category
    filterGamesByCategory: query([text], Vec(Game), (category) => {
        return gameStorage.values().filter((game) => game.category === category);
    }
    ),

    //Search for a game and return the result as a list of games or an error message
    searchGames: query([text], Result(Vec(Game), Message), (searchTerm) => {
        const lowerCaseSearchInput = searchTerm.toLowerCase();
        try {
            const searchedGames = gameStorage.values().filter((game) => game.title.toLowerCase().includes(lowerCaseSearchInput) || game.organiser.toLowerCase().includes(lowerCaseSearchInput));
            
            return Ok(searchedGames);
        } catch (error) {
            return Err({ NotFound: `Game with the term ${searchTerm} has not been found in title or Organiser` });
        }

    }
    ),

    // Insert a participant into the game's participants list
    insertParticipant: update([text, text], Result(Game, Message), (gameId, participantId) => {
        const gameOpt = gameStorage.get(gameId);
        if ("None" in gameOpt) {
            return Err({ NotFound: `cannot add participant: game with id=${gameId} not found` });
        }
        const participantOpt = participantStorage.get(participantId);
        if ("None" in participantOpt) {
            return Err({ NotFound: `cannot add participant: participant with id=${participantId} not found` });
        }
        if (gameOpt.Some.particpants.includes(participantId)) {
            return Err({ NotFound: `cannot add participant: participant with id=${participantId} already added to game with id=${gameId}` });
        }

        const participant = participantOpt.Some;
        gameOpt.Some.participants.push(participant);
        gameStorage.insert(gameId, gameOpt.Some);
        return Ok(gameOpt.Some);
    }
    ),



    // remove Participant from game
    removeParticipant: update([text, text], Result(Game, Message), (gameId, participantId) => {

        const gameOpt = gameStorage.get(gameId);
        if ("None" in gameOpt) {
            return Err({ NotFound: `cannot remove participant: game with id=${gameId} not found` });
        }
        const participantOpt = participantStorage.get(participantId);
        if ("None" in participantOpt) {
            return Err({ NotFound: `cannot remove participant: participant with id=${participantId} not found` });
        }
        if (!gameOpt.Some.particpants.includes(participantId)) {
            return Err({ NotFound: `cannot remove participant: participant with id=${participantId} not found in game with id=${gameId}` });
        }
        const participants = gameOpt.Some.participants;

        for (let i = 0; i < participants.length; i++) {
            if (participants[i].id === participantId) {
                participants.splice(i, 1);
                break;
            }
        }

        gameOpt.Some.participants = participants;
        gameStorage.insert(gameId, gameOpt.Some);
        return Ok(gameOpt.Some);
    }
    ),

    //update a game
    updateGame: update([Game], Result(Game, Message), (payload) => {
        const gameOpt = gameStorage.get(payload.id);
        if ("None" in gameOpt) {
            return Err({ NotFound: `cannot update the game: game with id=${payload.id} not found` });
        }
        gameStorage.insert(gameOpt.Some.id, payload);
        return Ok(payload);
    }
    ),
    //Create a Game
    addGame: update([GamePayload], Result(Game, Message), (payload) => {
        if (typeof payload !== "object" || Object.keys(payload).length === 0) {
            return Err({ NotFound: "invalid payoad" })
        }
        const game = { id: uuidv4(), participants: [], ...payload };
        gameStorage.insert(game.id, game);
        return Ok(game);
    }
    ),

    // Delete a game by id
    deleteGame: update([text], Result(Game, Message), (id) => {
        const deletedgameOpt = gameStorage.get(id);
        if ("None" in deletedgameOpt) {
            return Err({ NotFound: `cannot delete the game: game with id=${id} not found` });
        }
        gameStorage.remove(id);
        return Ok(deletedgameOpt.Some);
    }
    ),
    //update a participant
    updateParticipant: update([Participant], Result(Participant, Message), (payload) => {
        const participantOpt = participantStorage.get(payload.id);
        if ("None" in participantOpt) {
            return Err({ NotFound: `cannot update the participant: participant with id=${payload.id} not found` });
        }
        participantStorage.insert(participantOpt.Some.id, payload);
        return Ok(payload);
    }
    ),
    //Create a participant
    addParticipant: update([ParticipantPayload], Result(Participant, Message), (payload) => {
        if (typeof payload !== "object" || Object.keys(payload).length === 0) {
            return Err({ NotFound: "invalid payoad" })
        }
        const participant = { id: uuidv4(), ...payload };
        participantStorage.insert(participant.id, participant);
        return Ok(participant);
    }
    ),

    // Delete a participant by id
    deleteParticipant: update([text], Result(Participant, Message), (id) => {
        const deletedParticipantOpt = participantStorage.get(id);
        if ("None" in deletedParticipantOpt) {
            return Err({ NotFound: `cannot delete the participant: participant with id=${id} not found` });
        }
        participantStorage.remove(id);
        return Ok(deletedParticipantOpt.Some);
    }
    ),

    // Get all the participants
    getParticipants: query([], Vec(Participant),() => {
        return participantStorage.values();
    }),

    // Get a participant by id
    getParticipant: query([text], Result(Participant, Message), (id) => { 
        const participantOpt = participantStorage.get(id);
        if ("None" in participantOpt) {
            return Err({ NotFound: `participant with id=${id} not found` });
        }
        return Ok(participantOpt.Some);
    }   
    ),

    //Search for a participant and return the result as a list of participants or an error message
    searchParticipants: query([text], Result(Vec(Participant), Message), (searchTerm) => {
        const lowerCaseSearchInput = searchTerm.toLowerCase();
        try {
            const searchedParticipants = participantStorage.values().filter((participant) => participant.name.toLowerCase().includes(lowerCaseSearchInput) || participant.interest.toLowerCase().includes(lowerCaseSearchInput));
            
            return Ok(searchedParticipants);
        } catch (error) {
            return Err({ NotFound: `Participant with the term ${searchTerm} has not been found in name or Interest` });
        }

    }
    ),

    // Get the list of Particpants for a game
    getGameParticipants: query([text], Vec(Participant), (gameId) => {
        const gameOpt = gameStorage.get(gameId);
        if ("None" in gameOpt) {
            return [];
        }
        return gameOpt.Some.particpants;
    }
    ),

    // Get the no of participants for a game
    getNoOfParticipants: query([text], nat64, (gameId) => {
        const gameOpt = gameStorage.get(gameId);
        if ("None" in gameOpt) {
            return 0n;
        }
        return BigInt(gameOpt.Some.particpants.length);
    }
    ),


});



// a workaround to make uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }
};


