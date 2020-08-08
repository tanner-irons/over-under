export const setQuestions = (questions) => {
    return {
        type: QuestionActions.SetQuestions,
        payload: questions
    }
}

export const updateCurrentIndex = (index) => {
    return {
        type: QuestionActions.UpdateCurrentIndex,
        payload: index
    }
}

export const incrementCurrentIndex = () => {
    return {
        type: QuestionActions.IncrementCurrentIndex,
    }
}

export const decrementCurrentIndex = () => {
    return {
        type: QuestionActions.DecrementCurrentIndex,
    }
}

export const QuestionActions = {
    SetQuestions: 'SetQuestions',
    UpdateCurrentIndex: 'UpdateCurrentIndex',
    IncrementCurrentIndex: 'IncrementCurrentIndex',
    DecrementCurrentIndex: 'DecrementCurrentIndex'
}