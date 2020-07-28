export const getActiveResponse = (state) => {
    return state.responses.responses[state.responses.activeIndex];
}