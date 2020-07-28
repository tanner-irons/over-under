import { SettingsActions } from "../actions/SettingsActions";

const initialState = {
    settings: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SettingsActions.UpdateSettings:
            state.settings = action.payload;
            return state;
        default:
            return state;
    }
};