import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import questions from './data/questions.json'
import SettingsReducer from './store/settings/SettingsReducer';
import GameReducer from './store/game/GameReducer';
import QuestionReducer from './store/question/QuestionReducer';
import SessionReducer from './store/session/SessionReducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  game: GameReducer,
  questions: QuestionReducer,
  settings: SettingsReducer
});

const initialState = { questions: { questions, currentIndex: 0 } };
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
