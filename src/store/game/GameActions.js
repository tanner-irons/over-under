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

export const setActivePlayer = (id) => {
    return {
        type: GameActions.SetActivePlayer,
        payload: id
    }
}

export const GameActions = {
    SetTargetGuess: 'SetTargetGuess',
    AddPlayer: 'AddPlayer',
    UpdatePlayer: 'UpdatePlayer',
    SetActivePlayer: 'SetActivePlayer'
}