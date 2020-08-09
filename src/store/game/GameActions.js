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

export const updatePlayers = (players) => {
    return {
        type: GameActions.UpdatePlayers,
        payload: players
    }
}

export const updateTurn = (turn) => {
    return {
        type: GameActions.UpdateTurn,
        payload: turn
    }
}

export const incrementTurn = () => {
    return {
        type: GameActions.IncrementTurn
    }
}

export const decrementTurn = () => {
    return {
        type: GameActions.DecrementTurn
    }
}

export const toggleTimer = () => {
    return {
        type: GameActions.ToggleTimer
    }
}


export const GameActions = {
    SetTargetGuess: 'SetTargetGuess',
    AddPlayer: 'AddPlayer',
    UpdatePlayer: 'UpdatePlayer',
    UpdatePlayers: 'UpdatePlayers',
    UpdateTurn: 'UpdateTurn',
    IncrementTurn: 'IncrementTurn',
    DecrementTurn: 'DecrementTurn',
    ToggleTimer: 'ToggleTimer'
}