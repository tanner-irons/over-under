import { QuestionActions } from "./QuestionActions";

const initialState = {
    questions: [],
    activeIndex: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case QuestionActions.SetQuestions:
            return {
                ...state,
                questions: action.payload
            };
        case QuestionActions.UpdateActiveIndex:
            return {
                ...state,
                activeIndex: action.payload
            };
        case QuestionActions.IncrementActiveIndex:
            if (state.activeIndex + 1 < state.questions.length) {
                return {
                    ...state,
                    activeIndex: state.activeIndex + 1
                };
            }
            return state;
        case QuestionActions.DecrementActiveIndex:
            if (state.activeIndex - 1 >= 0) {
                return {
                    ...state,
                    activeIndex: state.activeIndex - 1
                };
            }
            return state;
        default:
            return state;
    }
};