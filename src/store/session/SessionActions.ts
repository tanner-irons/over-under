export const updateSession = (session) => {
    return {
        type: SessionActions.UpdateSession,
        payload: session
    }
}

export const SessionActions = {
    UpdateSession: 'UpdateSession'
}