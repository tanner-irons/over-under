export const updateSettings = (settings) => {
    return {
        type: SettingsActions.UpdateSettings,
        payload: settings
    }
}

export const SettingsActions = {
    UpdateSettings: 'UpdatingSettings'
}