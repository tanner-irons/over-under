import { QuestionActions } from "./QuestionActions";

const initialState = {
    questions: [],
    currentIndex: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case QuestionActions.SetQuestions:
            return {
                ...state,
                questions: action.payload
            };
        case QuestionActions.UpdateCurrentIndex:
            return {
                ...state,
                currentIndex: action.payload
            };
        case QuestionActions.IncrementCurrentIndex:
            if (state.currentIndex + 1 < state.questions.length) {
                return {
                    ...state,
                    currentIndex: state.currentIndex + 1
                };
            }
            return state;
        case QuestionActions.DecrementCurrentIndex:
            if (state.currentIndex - 1 >= 0) {
                return {
                    ...state,
                    currentIndex: state.currentIndex - 1
                };
            }
            return state;
        default:
            return state;
    }
};