export const getSessionPlayer = (state) => {
    return state.game.players[state.session.playerId];
}