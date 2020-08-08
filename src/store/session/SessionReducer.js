import { SessionActions } from "./SessionActions";

const initialState = {
    id: 'one',
    hostId: 'one'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SessionActions.UpdateSession:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};