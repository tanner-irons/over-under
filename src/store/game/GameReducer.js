import { GameActions } from "./GameActions";

const initialState = {
    players: {},
    turn: {
        order: [],
        activeIndex: 0
    },
    target: 50,
    started: false,
    timeLeft: -1
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
            const incrementedIndex = state.turn.activeIndex + 1 < state.turn.order.length ? state.turn.activeIndex + 1 : 0;
            return {
                ...state,
                turn: {
                    ...state.turn,
                    activeIndex: incrementedIndex
                }
            };
        case GameActions.DecrementTurn:
            const decrementedIndex = state.turn.activeIndex - 1 >= 0 ? state.turn.activeIndex - 1 : state.turn.order.length - 1;
            return {
                ...state,
                turn: {
                    ...state.turn,
                    activeIndex: decrementedIndex
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
        default:
            return state;
    }
};