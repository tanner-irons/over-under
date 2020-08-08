import './Game.scss';

import { useSelector, useDispatch } from 'react-redux';

import React, { useCallback, useState } from 'react';
import Question from '../../components/question/Question';
import Meter from '../../components/meter/Meter';
import { setTargetGuess, updatePlayer, updatePlayers } from './../../store/game/GameActions';
import { getPlayer, getCurrentPlayerId } from './../../store/game/GameSelectors';
import Score from './../../components/score/Score';
import Prompt from '../../components/prompt/Prompt';
import { Guesses } from '../../store/game/GameReducer';
import { getCurrentQuestion } from './../../store/question/QuestionSelectors';
import Timer from './../../components/timer/Timer';
import { incrementCurrentIndex } from './../../store/question/QuestionActions';

const Game = () => {
    const [timerStarted, setTimerStarted] = useState(false);
    const dispatch = useDispatch();
    const session = useSelector(state => state.session);
    const sessionPlayer = useSelector(getPlayer(session.id));
    const game = useSelector(state => state.game);
    const currentQuestion = useSelector(getCurrentQuestion);
    const currentPlayerId = useSelector(getCurrentPlayerId);

    const sessionPlayerIsCurrent = sessionPlayer.id === currentPlayerId;
    const playerHasGuessed = sessionPlayer.guess !== Guesses.None;

    const updateTargetGuess = useCallback(
        guess => {
            if (guess >= 0 && guess <= 100) {
                dispatch(setTargetGuess(guess));
            }
        },
        [dispatch]
    );

    const updatePlayerGuess = useCallback(
        guess => {
            !playerHasGuessed && dispatch(updatePlayer(sessionPlayer.id, { guess }))
        },
        [playerHasGuessed, dispatch, sessionPlayer.id]
    );

    const scoreQuestion = useCallback(
        () => {
            const update = Object.entries(game.players).reduce((players, [key, player]) => {
                if (currentPlayerId === player.id) {
                    if (game.targetGuess === currentQuestion.yes) {
                        player.score += 2000;
                    }
                }
                else {
                    if (player.guess === Guesses.Lower && currentQuestion.yes < game.targetGuess) {
                        player.score += 500;
                    }
                    else if (player.guess === Guesses.MuchLower && currentQuestion.yes < game.targetGuess) {
                        if (game.targetGuess - currentQuestion.yes >= 15) {
                            player.score += 1000;
                        }
                    }
                    else if (player.guess === Guesses.Higher && currentQuestion.yes > game.targetGuess) {
                        player.score += 500;
                    }
                    else if (player.guess === Guesses.MuchHigher && currentQuestion.yes > game.targetGuess) {
                        if (currentQuestion.yes - game.targetGuess >= 15) {
                            player.score += 1000;
                        }
                    }
                    player.guess = Guesses.None;
                }

                players[key] = player;
                return players;
            }, {});

            dispatch(updatePlayers(update));
            dispatch(incrementCurrentIndex())
            setTimerStarted(false);
        },
        [dispatch, game.players, game.targetGuess, currentQuestion.yes, currentPlayerId]
    );

    const handleConfirm = () => {
        setTimerStarted(true);
    };

    return (
        <div className="game">
            <div className="section section-game">
                <div className={`sub-section sub-section-question${sessionPlayerIsCurrent ? " no-response" : ""}`}>
                    <Question question={currentQuestion}></Question>
                    <Meter readOnly={!sessionPlayerIsCurrent} value={game.targetGuess} handleChange={updateTargetGuess} handleConfirm={handleConfirm}></Meter>
                    {timerStarted &&
                        <Timer seconds={15} handleFinish={scoreQuestion}></Timer>
                    }
                </div>
                {!sessionPlayerIsCurrent &&
                    <div className="sub-section sub-section-prompt">
                        <Prompt readOnly={playerHasGuessed} guess={sessionPlayer.guess} handleChange={updatePlayerGuess}></Prompt>
                    </div>
                }
            </div>
            <div className="section section-score">
                <Score players={game.players}></Score>
            </div>
        </div>
    );
};

export default Game;