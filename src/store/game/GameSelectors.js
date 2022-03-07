export const getPlayer = (id) => {
    return state => state.game.players[id];
}

export const getCurrentPlayer = (state) => {
    return state.game.players[state.game.turn.order[state.game.turn.activeTurnIndex]];
}

export const isPlayerCurrent = (id) => {
    return (state) => state.game.players[state.game.turn.order[state.game.turn.activeTurnIndex]]?.id === id;
}

export const getCurrentQuestion = (state) => {
    return state.game.questions[state.game.currentQuestionIndex] ?? {};
}