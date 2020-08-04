export const getActiveQuestion = (state) => {
    return state.questions.questions[state.questions.activeIndex];
}