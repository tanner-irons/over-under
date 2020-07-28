import { useSelector, useDispatch } from 'react-redux';

import React from 'react';
import Question from '../../components/question/Question';
import Meter from '../../components/meter/Meter';
import { getActiveResponse } from '../../store/response/ResponseSelectors';
import { incrementActiveIndex, decrementActiveIndex } from '../../store/response/ResponseActions';

const Game = () => {
    const activeResponse = useSelector(getActiveResponse); 

    const dispatch = useDispatch();
    const goNext = () => dispatch(incrementActiveIndex());
    const goPrev = () => dispatch(decrementActiveIndex());

    return (
        <div className="game">
            <Question question={activeResponse.question}></Question>
            <Meter results={{ count: activeResponse.count, yes: activeResponse.yes }}></Meter>
            <button onClick={goPrev}>Prev</button>
            <button onClick={goNext}>Next</button>
        </div>
    );
};

export default Game;