import './Game.scss';

import { useSelector, useDispatch } from 'react-redux';

import React, { useCallback } from 'react';
import Question from '../../components/question/Question';
import Meter from '../../components/meter/Meter';
import { getActiveQuestion } from '../../store/question/QuestionSelectors';
import { setTargetGuess, updatePlayer } from './../../store/game/GameActions';
import { getActivePlayer } from './../../store/game/GameSelectors';
import Score from './../../components/score/Score';
import Response from './../../components/response/Response';
import { Guesses } from '../../store/game/GameReducer';

const Game = () => {
    const dispatch = useDispatch();

    const game = useSelector(state => state.game);

    const session = game.session;
    const activePlayer = useSelector(getActivePlayer(session.id));

    const activeQuestion = useSelector(getActiveQuestion);

    const updateTargetGuess = useCallback(guess => {
        if (guess >= 0 && guess <= 100) {
            dispatch(setTargetGuess(guess));
            dispatch(updatePlayer(activePlayer.id, { score: guess }))
        }
    }, [dispatch, activePlayer.id]);

    const handleResponse = useCallback(guess => {
        if (guess === Guesses.Lower && activeQuestion.yes < game.targetGuess) {
            dispatch(updatePlayer(activePlayer.id, { guess, score: Number(activePlayer.score) + 500 }));
        } else if (guess === Guesses.MuchLower && activeQuestion.yes < game.targetGuess) {
            dispatch(updatePlayer(activePlayer.id, { guess, score: Number(activePlayer.score) + 500 }));
        }
        else if (guess === Guesses.Higher && activeQuestion.yes > game.targetGuess) {
            dispatch(updatePlayer(activePlayer.id, { guess, score: Number(activePlayer.score) + 500 }));
        } else if (guess === Guesses.MuchHigher && activeQuestion.yes > game.targetGuess) {
            dispatch(updatePlayer(activePlayer.id, { guess, score: Number(activePlayer.score) + 500 }));
        }
        dispatch(updatePlayer(activePlayer.id, { guess }));
    }, [dispatch, activeQuestion, activePlayer.id, activePlayer.score, game.targetGuess]);

    return (
        <div className="game">
            <div className="section section-game">
                <div className="sub-section sub-section-question">
                    <Question question={activeQuestion.question}></Question>
                    <Meter data={{ percentage: game.targetGuess }} handleChange={updateTargetGuess}></Meter>
                </div>
                <div className="sub-section sub-section-response">
                    <Response response={activePlayer.guess} handleChange={handleResponse}></Response>
                </div>
            </div>
            <div className="section section-score">
                <Score></Score>
            </div>
        </div>
    );
};

export default Game;