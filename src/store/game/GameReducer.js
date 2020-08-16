import { GameActions } from "./GameActions";

export const Guesses = Object.freeze({
    None: 'None',
    Lower: 'Lower',
    MuchLower: 'Much Lower',
    Higher: 'Higher',
    MuchHigher: 'Much Higher',
    Target: 'Target'
});

const initialState = {
    players: {
        one: {
            id: 'one',
            name: 'Tanner',
            score: 0,
            guess: Guesses.None
        },
        two: {
            id: 'two',
            name: 'Prison Mike',
            score: 0,
            guess: Guesses.None
        }
    },
    turn: {
        order: ['one', 'two'],
        activeIndex: 0
    },
    target: 50,
    timer: -1
};

export default (state = initialState, action) => {
    switch (action.type) {
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
                    ...state.payload.players,
                    ...{ [newPlayer.id]: newPlayer },
                    id: newPlayer.id
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
            if (state.turn.activeIndex + 1 < state.turn.order.length) {
                return {
                    ...state,
                    turn: {
                        ...state.turn,
                        activeIndex: state.turn.activeIndex + 1
                    }
                };
            }
            return state;
        case GameActions.DecrementTurn:
            if (state.turn.activeIndex - 1 >= 0) {
                return {
                    ...state,
                    turn: {
                        ...state.turn,
                        activeIndex: state.turn.activeIndex - 1
                    }
                };
            }
            return state;
        case GameActions.SetTimer:
            return {
                ...state,
                timer: action.payload
            }
        default:
            return state;
    }
};