import './Game.scss';

import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTimer, useWebSocket } from './../../store/socket';
import { Guesses } from './../../store/game/GameReducer';
import { updatePlayer, updatePlayers, setTarget, incrementTurn, setTimer } from './../../store/game/GameActions';
import { getCurrentPlayerId } from './../../store/game/GameSelectors';
import { incrementQuestion } from './../../store/question/QuestionActions';
import { getCurrentQuestion } from './../../store/question/QuestionSelectors';
import { getSessionPlayer } from './../../store/session/SessionSelectors';
import Question from './../../components/question/Question';
import Meter from './../../components/meter/Meter';
import Score from './../../components/score/Score';
import Prompt from './../../components/prompt/Prompt';
import Timer from './../../components/timer/Timer';
import { throttle } from 'lodash';

const Game = () => {
    const emitAction = useWebSocket();

    const sessionPlayer = useSelector(getSessionPlayer);
    const { players, target, timer } = useSelector(state => state.game);
    const settings = useSelector(state => state.settings);
    const currentQuestion = useSelector(getCurrentQuestion);
    const currentPlayerId = useSelector(getCurrentPlayerId);
    const sessionPlayerIsCurrent = sessionPlayer?.id === currentPlayerId;
    const playerHasGuessed = sessionPlayer?.guess !== Guesses.None;

    const throttledEmit = throttle((action) => {
        emitAction(action);
    }, 1500, { leading: true, trailing: false });

    const updateTarget = useCallback(
        guess => {
            if (sessionPlayerIsCurrent && !playerHasGuessed && guess >= 0 && guess <= 100) {
                throttledEmit(setTarget(guess))
            }
        },
        [throttledEmit, playerHasGuessed, sessionPlayerIsCurrent]
    );

    const updatePlayerGuess = useCallback(
        guess => !sessionPlayerIsCurrent && !playerHasGuessed && emitAction(updatePlayer(sessionPlayer?.id, { guess })),
        [emitAction, sessionPlayer, playerHasGuessed, sessionPlayerIsCurrent]
    );

    const scoreQuestion = useCallback(() => {
        const update = Object.entries(players).reduce((players, [key, player]) => {
            let score;
            switch (true) {
                case currentPlayerId === player.id && target === currentQuestion.yes:
                    score = player.score + 2500;
                    break;
                case currentPlayerId === player.id && target >= (currentQuestion.yes - 5) && target <= (currentQuestion.yes + 5):
                    score = player.score + 1500;
                    break;
                case player.guess === Guesses.Lower && currentQuestion.yes < target:
                    score = player.score + 500;
                    break;
                case player.guess === Guesses.MuchLower && currentQuestion.yes < target - 15:
                    score = player.score + 1000;
                    break;
                case player.guess === Guesses.Higher && currentQuestion.yes > target:
                    score = player.score + 500;
                    break;
                case player.guess === Guesses.MuchHigher && currentQuestion.yes > target + 15:
                    score = player.score + 1000;
                    break;
                default:
                    score = player.score;
                    break;
            }

            players[key] = { ...player, score, guess: Guesses.None };
            return players;
        }, {});

        emitAction(updatePlayers(update));
        emitAction(incrementQuestion());
        emitAction(incrementTurn());
    },
        [emitAction, currentPlayerId, players, target, currentQuestion.yes]
    );

    const onTick = useCallback((seconds) => emitAction(setTimer(seconds)), [emitAction]);

    const startTimer = useTimer(settings.timer, onTick, scoreQuestion);

    const confirm = useCallback(() => {
        emitAction(updatePlayer(sessionPlayer?.id, { guess: Guesses.Target }));
        startTimer();
    }, [emitAction, sessionPlayer, startTimer]);

    return (
        <div className="game">
            <div className="section section-game">
                <div className={`sub-section sub-section-question${sessionPlayerIsCurrent ? " no-response" : ""}`}>
                    <Question question={currentQuestion}></Question>
                    <Meter readOnly={!sessionPlayerIsCurrent || playerHasGuessed} value={target} handleChange={updateTarget} handleConfirm={confirm}></Meter>
                    {timer >= 0 &&
                        <Timer seconds={timer}></Timer>
                    }
                </div>
                {!sessionPlayerIsCurrent &&
                    <div className="sub-section sub-section-prompt">
                        <Prompt readOnly={playerHasGuessed} guess={sessionPlayer?.guess} handleChange={updatePlayerGuess}></Prompt>
                    </div>
                }
            </div>
            <div className="section section-score">
                <Score players={players}></Score>
            </div>
        </div>
    );
};

export default Game;