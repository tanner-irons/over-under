export const updateTargetGuess = (guess) => {
    return {
        type: GameActions.UpdateTargetGuess,
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

export const GameActions = {
    UpdateTargetGuess: 'UpdateTargetGuess',
    AddPlayer: 'AddPlayer',
    UpdatePlayer: 'UpdatePlayer'
}