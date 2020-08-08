import './Menu.scss';

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { incrementCurrentIndex, decrementCurrentIndex } from './../../store/question/QuestionActions';
import { incrementTurn, decrementTurn } from '../../store/game/GameActions';

const Menu = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const nextQuestion = () => dispatch(incrementCurrentIndex());
    const prevQuestion = () => dispatch(decrementCurrentIndex());
    const nextPlayer = () => dispatch(incrementTurn());
    const prevPlayer = () => dispatch(decrementTurn());

    return (
        <div className="menu">
            <div className="links">
                <button onClick={() => history.push('/new')}>New Game</button>
                <button onClick={() => history.push('/game')}>Game</button>
                <button onClick={prevQuestion}>Prev Question</button>
                <button onClick={nextQuestion}>Next Question</button>
                <button onClick={prevPlayer}>Prev Player</button>
                <button onClick={nextPlayer}>Next Player</button>
            </div>
        </div>
    );
};

export default Menu;