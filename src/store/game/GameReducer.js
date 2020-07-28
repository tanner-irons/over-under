import { GameActions } from "./GameActions";

export const Guesses = Object.freeze({
    None: Symbol('None'),
    Lower: Symbol('Lower'),
    MuchLower: Symbol('MuchLower'),
    Higher: Symbol('Higher'),
    MuchHigher: Symbol('MuchHigher')
});

const initialState = {
    players: new Map([['test', { id: 'test', name: 'Tanner', score: 0, guess: Guesses.None }]]),
    activePlayerId: 'test',
    targetGuess: 50
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GameActions.SetTargetGuess:
            state.targetGuess = action.payload;
            return state;
        case GameActions.AddPlayer:
            state.players.set(action.player.id, action.player);
            return state;
        case GameActions.UpdatePlayer:
            const player = state.players.get(action.payload.id);
            state.players.set(action.payload.id, { ...player, ...action.payload.update, id: action.payload.id });
            return state;
        case GameActions.SetActivePlayer:
            state.activePlayerId = action.payload;
            return state;
        default:
            return state;
    }
};