import { SettingsActions } from "./SettingsActions";

const initialState = {
    timeLimit: 5
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