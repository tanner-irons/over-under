import './Game.scss';

import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useWebSocket } from '../../hooks/UseWebSocket';
import { useTimer } from '../../hooks/UseTimer';
import { updatePlayer, updatePlayers, setTarget, incrementTurn, setTimeLeft, incrementQuestion } from '../../store/game/GameActions';
import { isPlayerCurrent, getCurrentQuestion } from '../../store/game/GameSelectors';
import { getSessionPlayer } from '../../store/session/SessionSelectors';
import Question from '../../components/question/Question';
import Meter from '../../components/meter/Meter';
import Score from '../../components/score/Score';
import Vote from '../../components/vote/Vote';
import Timer from '../../components/timer/Timer';
import { throttle } from 'lodash';
import { Guesses } from '../../models/Guesses';
import { useRootSelector } from '../../hooks/UseRootSelector';

const Game = () => {
    const dispatch = useDispatch();
    const emitAction = useWebSocket();
    const history = useHistory();

    const { id, guess } = useSelector(getSessionPlayer);
    const playerIsCurrent = useSelector(isPlayerCurrent(id));
    const playerHasGuessed = guess !== Guesses.None;

    const { players, target, timeLeft } = useRootSelector(state => state.game);
    const { prompt, percentage } = useSelector(getCurrentQuestion);
    const { timeLimit } = useRootSelector(state => state.settings);

    const updateTarget = useRef(throttle(
        guess => playerIsCurrent && !playerHasGuessed && guess >= 0 && guess <= 100 && emitAction(setTarget(guess)),
        150,
        { leading: true, trailing: false }
    ));

    const updatePlayerGuess = guess => !playerIsCurrent && !playerHasGuessed && emitAction(updatePlayer(id, { guess }));

    const scoreQuestion = useCallback(
        () => {
            const update = Object.entries<any>(players).reduce((players, [key, player]) => {
                const score = calculateScore(player, target, percentage)
                players[key] = { ...player, score, guess: Guesses.None };
                return players;
            }, {});

            emitAction(updatePlayers(update));
            emitAction(incrementTurn());
            emitAction(incrementQuestion());
            emitAction(setTarget(50));
        },
        [emitAction, players, target, percentage]
    );

    const onTick = useCallback(
        seconds => emitAction(setTimeLeft(seconds)),
        [emitAction]
    );

    const startTimer = useTimer(timeLimit, onTick, scoreQuestion);

    const confirm = useCallback(
        () => {
            dispatch(updatePlayer(id, { guess: Guesses.Target }));
            startTimer();
        },
        [dispatch, startTimer, id]
    );

    useEffect(
        () => {
            if (!prompt) {
                history.push('/victory');
            }
        },
        [prompt, history]
    );

    return (
        <div className="game">
            <div className="section section-game">
                <div className={`sub-section sub-section-question${playerIsCurrent ? " no-response" : ""}`}>
                    <Question prompt={prompt}></Question>
                    <Meter readOnly={!playerIsCurrent || playerHasGuessed} value={target} handleChange={updateTarget.current} handleConfirm={confirm}></Meter>
                    <Timer seconds={timeLeft}></Timer>
                </div>
                {!playerIsCurrent &&
                    <div className="sub-section sub-section-vote">
                        <Vote readOnly={playerHasGuessed} guess={guess} handleChange={updatePlayerGuess}></Vote>
                    </div>
                }
            </div>
            <div className="section section-score">
                <Score players={players}></Score>
            </div>
        </div>
    );
};

const calculateScore = (player, target, percentage) => {
    switch (true) {
        case player.guess === Guesses.Target && target === percentage:
            return player.score + 2500;
        case player.guess === Guesses.Target && target >= (percentage - 5) && target <= (percentage + 5):
            return player.score + 1500;
        case player.guess === Guesses.Target && target >= (percentage - 10) && target <= (percentage + 10):
            return player.score + 1000;
        case player.guess === Guesses.Target && target >= (percentage - 15) && target <= (percentage + 15):
            return player.score + 500;
        case player.guess === Guesses.Lower && percentage < target:
            return player.score + 500;
        case player.guess === Guesses.MuchLower && percentage < target - 15:
            return player.score + 1000;
        case player.guess === Guesses.Higher && percentage > target:
            return player.score + 500;
        case player.guess === Guesses.MuchHigher && percentage > target + 15:
            return player.score + 1000;
        default:
            return player.score;
    }
};

export default Game;