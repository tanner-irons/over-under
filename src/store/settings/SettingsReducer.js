import { SettingsActions } from "./SettingsActions";

const initialState = {
    settings: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SettingsActions.UpdateSettings:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...action.payload
                }
            }
        default:
            return state;
    }
};