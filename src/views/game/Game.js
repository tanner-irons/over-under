import './Game.scss';

import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Guesses } from '../../store/game/GameReducer';
import { updatePlayer, updatePlayers, setTargetGuess, toggleTimer } from './../../store/game/GameActions';
import { getPlayer, getCurrentPlayerId } from './../../store/game/GameSelectors';
import { incrementCurrentIndex } from './../../store/question/QuestionActions';
import { getCurrentQuestion } from './../../store/question/QuestionSelectors';

import * as Socket from './../../socket/socket';

import Question from '../../components/question/Question';
import Meter from '../../components/meter/Meter';
import Score from './../../components/score/Score';
import Prompt from '../../components/prompt/Prompt';
import Timer from './../../components/timer/Timer';

const Game = () => {
    const session = useSelector(state => state.session);
    const sessionPlayer = useSelector(getPlayer(session.id));
    const game = useSelector(state => state.game);
    const currentQuestion = useSelector(getCurrentQuestion);
    const currentPlayerId = useSelector(getCurrentPlayerId);

    const sessionPlayerIsCurrent = sessionPlayer.id === currentPlayerId;
    const playerHasGuessed = sessionPlayer.guess !== Guesses.None;

    const unsubscribe = Socket.useDispatchSubscription();

    const updateTargetGuess = useCallback(
        guess => !playerHasGuessed && guess >= 0 && guess <= 100 && Socket.emitDispatch(setTargetGuess(guess)),
        [playerHasGuessed]
    );

    const updatePlayerGuess = useCallback(
        guess => !playerHasGuessed && Socket.emitDispatch(updatePlayer(sessionPlayer.id, { guess })),
        [playerHasGuessed, sessionPlayer.id]
    );

    const scoreQuestion = useCallback(
        () => {
            const update = Object.entries(game.players).reduce((players, [key, player]) => {
                let score;
                switch (true) {
                    case currentPlayerId === player.id && game.targetGuess === currentQuestion.yes:
                        score = player.score + 2500;
                        break;
                    case currentPlayerId === player.id && game.targetGuess >= (currentQuestion.yes - 5) && game.targetGuess <= (currentQuestion.yes + 5):
                        score = player.score + 1500;
                        break;
                    case player.guess === Guesses.Lower && currentQuestion.yes < game.targetGuess:
                        score = player.score + 500;
                        break;
                    case player.guess === Guesses.MuchLower && currentQuestion.yes < game.targetGuess - 15:
                        score = player.score + 1000;
                        break;
                    case player.guess === Guesses.Higher && currentQuestion.yes > game.targetGuess:
                        score = player.score + 500;
                        break;
                    case player.guess === Guesses.MuchHigher && currentQuestion.yes > game.targetGuess + 15:
                        score = player.score + 1000;
                        break;
                    default:
                        break;
                }

                players[key] = { ...player, score, guess: Guesses.None };
                return players;
            }, {});

            Socket.emitDispatch(toggleTimer());
            Socket.emitDispatch(updatePlayers(update));
            Socket.emitDispatch(incrementCurrentIndex());
        },
        [game.players, game.targetGuess, currentQuestion.yes, currentPlayerId]
    );

    const confirm = useCallback(() => {
        Socket.emitDispatch(updatePlayer(sessionPlayer.id, { guess: Guesses.Target }));
        Socket.emitDispatch(toggleTimer());
    }, [sessionPlayer.id]);

    return (
        <div className="game">
            <div className="section section-game">
                <div className={`sub-section sub-section-question${sessionPlayerIsCurrent ? " no-response" : ""}`}>
                    <Question question={currentQuestion}></Question>
                    <Meter readOnly={!sessionPlayerIsCurrent || playerHasGuessed} value={game.targetGuess} handleChange={updateTargetGuess} handleConfirm={confirm}></Meter>
                    {game.timer &&
                        <Timer seconds={5} handleFinish={sessionPlayerIsCurrent ? scoreQuestion : () => { }}></Timer>
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