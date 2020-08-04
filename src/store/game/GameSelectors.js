export const getActivePlayer = (id) => {
    return state => state.game.players[id];
}