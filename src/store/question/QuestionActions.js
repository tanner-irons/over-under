export const setQuestions = (questions) => {
    return {
        type: QuestionActions.SetQuestions,
        payload: questions
    }
}

export const updateActiveIndex = (index) => {
    return {
        type: QuestionActions.UpdateActiveIndex,
        payload: index
    }
}

export const incrementActiveIndex = () => {
    return {
        type: QuestionActions.IncrementActiveIndex,
    }
}

export const decrementActiveIndex = () => {
    return {
        type: QuestionActions.DecrementActiveIndex,
    }
}

export const QuestionActions = {
    SetQuestions: 'SetQuestions',
    UpdateActiveIndex: 'UpdateActiveIndex',
    IncrementActiveIndex: 'IncrementActiveIndex',
    DecrementActiveIndex: 'DecrementActiveIndex'
}