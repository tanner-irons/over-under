import { SettingsActions } from "./SettingsActions";

const initialState = {
    settings: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SettingsActions.UpdateSettings:
            state.settings = { ...state.settings, ...action.payload };
            return state;
        default:
            return state;
    }
};