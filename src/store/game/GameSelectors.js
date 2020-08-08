export const getPlayer = (id) => {
    return state => state.game.players[id];
}

export const getCurrentPlayer = (state) => {
    return state.game.players[state.game.turn.order[state.game.turn.activeIndex]];
}