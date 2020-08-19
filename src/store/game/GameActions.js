export const updateGame = (game) => {
    return {
        type: GameActions.UpdateGame,
        payload: game
    }
}

export const setTarget = (guess) => {
    return {
        type: GameActions.SetTarget,
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

export const setTimeLeft = (time) => {
    return {
        type: GameActions.SetTimer,
        payload: time
    }
}

export const startGame = () => {
    return {
        type: GameActions.StartGame
    }
}

export const GameActions = {
    UpdateGame: 'UpdateGame',
    SetTarget: 'SetTarget',
    AddPlayer: 'AddPlayer',
    UpdatePlayer: 'UpdatePlayer',
    UpdatePlayers: 'UpdatePlayers',
    UpdateTurn: 'UpdateTurn',
    IncrementTurn: 'IncrementTurn',
    DecrementTurn: 'DecrementTurn',
    SetTimer: 'SetTimer',
    StartGame: 'StarGame'
}