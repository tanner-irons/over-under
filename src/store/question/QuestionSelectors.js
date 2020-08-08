export const getCurrentQuestion = (state) => {
    return state.questions.questions[state.questions.currentIndex];
}