import { SessionActions } from "./SessionActions";

const initialState = {
    id: '1234',
    playerId: 'one'
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