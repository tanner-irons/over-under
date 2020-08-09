import './Menu.scss';

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { incrementCurrentIndex, decrementCurrentIndex } from './../../store/question/QuestionActions';
import { incrementTurn, decrementTurn } from '../../store/game/GameActions';
import { updateSession } from './../../store/session/SessionActions';

const Menu = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const nextQuestion = () => dispatch(incrementCurrentIndex());
    const prevQuestion = () => dispatch(decrementCurrentIndex());
    const nextTurn = () => dispatch(incrementTurn());
    const prevTurn = () => dispatch(decrementTurn());
    const setSessionOne = () => dispatch(updateSession({ id: 'one' }));
    const setSessionTwo = () => dispatch(updateSession({ id: 'two' }));

    return (
        <div className="menu">
            <div className="links">
                <button onClick={() => history.push('/new')}>New Game</button>
                <button onClick={() => history.push('/game')}>Game</button>
                <button onClick={prevQuestion}>Prev Question</button>
                <button onClick={nextQuestion}>Next Question</button>
                <button onClick={prevTurn}>Prev Turn</button>
                <button onClick={nextTurn}>Next Turn</button>
                <button onClick={setSessionOne}>Session 1</button>
                <button onClick={setSessionTwo}>Session 2</button>
            </div>
        </div>
    );
};

export default Menu;