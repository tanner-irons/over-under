import { IGame } from "../../models/Game";
import { GameActions } from "./GameActions";

const initialState: IGame = {
    started: false,
    players: {},
    turn: {
        order: [],
        activeTurnIndex: 0
    },
    target: 50,
    timeLeft: -1,
    questions: [],
    currentQuestionIndex: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GameActions.UpdateGame:
            return {
                ...state,
                ...action.payload
            };
        case GameActions.SetTarget:
            return {
                ...state,
                target: action.payload
            };
        case GameActions.AddPlayer:
            const newPlayer = action.payload;
            return {
                ...state,
                players: {
                    ...state.players,
                    ...{ [newPlayer.id]: newPlayer }
                },
                turn: {
                    ...state.turn,
                    order: [...state.turn.order, newPlayer.id]
                }
            }
        case GameActions.UpdatePlayer:
            const { id, update } = action.payload;
            const player = state.players[id];
            return {
                ...state,
                players:
                {
                    ...state.players,
                    ...{
                        [id]: {
                            ...player,
                            ...update,
                            id
                        }
                    }
                }
            };
        case GameActions.UpdatePlayers:
            return {
                ...state,
                players: {
                    ...state.players,
                    ...action.payload
                }
            };
        case GameActions.UpdateTurn:
            return {
                ...state,
                turn: {
                    ...state.turn,
                    ...action.payload
                }
            }
        case GameActions.IncrementTurn:
            const incrementedIndex = state.turn.activeTurnIndex + 1 < state.turn.order.length ? state.turn.activeTurnIndex + 1 : 0;
            return {
                ...state,
                turn: {
                    ...state.turn,
                    activeTurnIndex: incrementedIndex
                }
            };
        case GameActions.DecrementTurn:
            const decrementedIndex = state.turn.activeTurnIndex - 1 >= 0 ? state.turn.activeTurnIndex - 1 : state.turn.order.length - 1;
            return {
                ...state,
                turn: {
                    ...state.turn,
                    activeTurnIndex: decrementedIndex
                }
            };
        case GameActions.SetTimer:
            return {
                ...state,
                timeLeft: action.payload
            }
        case GameActions.StartGame:
            return {
                ...state,
                started: true
            }
        case GameActions.SetQuestions:
            return {
                ...state,
                questions: action.payload
            };
        case GameActions.IncrementQuestionIndex:
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1
            };
        case GameActions.DecrementQuestionIndex:
            if (state.currentQuestionIndex - 1 >= 0) {
                return {
                    ...state,
                    currentQuestionIndex: state.currentQuestionIndex - 1
                };
            }
            return state;
        default:
            return state;
    }
};