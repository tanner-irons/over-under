export const updateSettings = (session) => {
    return {
        type: SessionActions.UpdateSettings,
        payload: session
    }
}

export const SessionActions = {
    UpdateSession: 'UpdateSession'
}