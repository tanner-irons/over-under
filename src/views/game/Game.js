import './Game.scss';

import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTimer, useWebSocket } from './../../store/socket';
import { Guesses } from './../../store/game/GameReducer';
import { updatePlayer, updatePlayers, setTarget, incrementTurn } from './../../store/game/GameActions';
import { getCurrentPlayerId } from './../../store/game/GameSelectors';
import { incrementQuestion } from './../../store/question/QuestionActions';
import { getCurrentQuestion } from './../../store/question/QuestionSelectors';
import { getSessionPlayer } from './../../store/session/SessionSelectors';
import Question from './../../components/question/Question';
import Meter from './../../components/meter/Meter';
import Score from './../../components/score/Score';
import Prompt from './../../components/prompt/Prompt';
import Timer from './../../components/timer/Timer';

const Game = () => {
    const { id: sessionId } = useSelector(state => state.session);
    const joinRoom = useCallback((socket) => {
        socket.send(JSON.stringify({ route: 'joinRoom', roomId: sessionId }));
    }, [sessionId]);
    const emitAction = useWebSocket(joinRoom);

    const { id, guess } = useSelector(getSessionPlayer);
    const { players, target, timer } = useSelector(state => state.game);
    const settings = useSelector(state => state.settings);
    const currentQuestion = useSelector(getCurrentQuestion);
    const currentPlayerId = useSelector(getCurrentPlayerId);
    const sessionPlayerIsCurrent = id === currentPlayerId;
    const playerHasGuessed = guess !== Guesses.None;

    const updateTarget = useCallback(
        guess => sessionPlayerIsCurrent && !playerHasGuessed && guess >= 0 && guess <= 100 && emitAction(setTarget(guess)),
        [emitAction, playerHasGuessed, sessionPlayerIsCurrent]
    );

    const updatePlayerGuess = useCallback(
        guess => !sessionPlayerIsCurrent && !playerHasGuessed && emitAction(updatePlayer(id, { guess })),
        [emitAction, id, playerHasGuessed, sessionPlayerIsCurrent]
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

    const startTimer = useTimer(settings.timer, scoreQuestion);

    const confirm = useCallback(() => {
        emitAction(updatePlayer(id, { guess: Guesses.Target }));
        startTimer();
    }, [emitAction, id, startTimer]);

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
                        <Prompt readOnly={playerHasGuessed} guess={guess} handleChange={updatePlayerGuess}></Prompt>
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