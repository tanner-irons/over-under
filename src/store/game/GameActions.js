export const setTargetGuess = (guess) => {
    return {
        type: GameActions.SetTargetGuess,
        payload: guess
    }
}

export const addPlayer = (player) => {
    return {
        type: GameActions.AddPlayer,
        payload: player
    }
}

export const updatePlayer = (id, update) => {
    return {
        type: GameActions.UpdatePlayer,
        payload: { id, update }
    }
}

export const updateSession = (session) => {
    return {
        type: GameActions.UpdateSession,
        payload: session
    }
}

export const updateTurn = (turn) => {
    return {
        type: GameActions.UpdateTurn,
        payload: turn
    }
}

export const GameActions = {
    SetTargetGuess: 'SetTargetGuess',
    AddPlayer: 'AddPlayer',
    UpdatePlayer: 'UpdatePlayer',
    UpdateSession: 'UpdateSession',
    UpdateTurn: 'UpdateTurn'
}