import './Menu.scss';

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { incrementCurrentIndex, decrementCurrentIndex } from './../../store/question/QuestionActions';

const Menu = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const goNext = () => dispatch(incrementCurrentIndex());
    const goPrev = () => dispatch(decrementCurrentIndex());

    return (
        <div className="menu">
            <div className="links">
                <button onClick={() => history.push('/new')}>New Game</button>
                <button onClick={() => history.push('/game')}>Game</button>
                <button onClick={goPrev}>Prev</button>
                <button onClick={goNext}>Next</button>
            </div>
        </div>
    );
};

export default Menu;