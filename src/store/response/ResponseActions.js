export const setResponses = (responses) => {
    return {
        type: ResponseActions.SetResponses,
        payload: responses
    }
}

export const updateActiveIndex = (index) => {
    return {
        type: ResponseActions.UpdateActiveIndex,
        payload: index
    }
}

export const incrementActiveIndex = () => {
    return {
        type: ResponseActions.IncrementActiveIndex,
    }
}

export const decrementActiveIndex = () => {
    return {
        type: ResponseActions.DecrementActiveIndex,
    }
}

export const ResponseActions = {
    SetResponses: 'SetResponses',
    UpdateActiveIndex: 'UpdateActiveIndex',
    IncrementActiveIndex: 'IncrementActiveIndex',
    DecrementActiveIndex: 'DecrementActiveIndex'
}