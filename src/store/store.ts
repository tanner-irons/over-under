import { combineReducers, createStore } from "redux";
import GameReducer from "./game/GameReducer";
import SessionReducer from "./session/SessionReducer";
import SettingsReducer from "./settings/SettingsReducer";
import questions from '../data/questions.json'

const rootReducer = combineReducers({
    session: SessionReducer,
    game: GameReducer,
    settings: SettingsReducer
  });
  
  const initialState = {
    game: {
      started: false,
      players: {},
      turn: {
        order: [],
        activeTurnIndex: 0
      },
      target: 50,
      timeLeft: -1,
      questions,
      currentQuestionIndex: 0
    }
  };
const store = createStore(rootReducer, initialState);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export default store;