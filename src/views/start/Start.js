import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useWebSocket } from './../../hooks/UseWebSocket';
import { updateSession } from './../../store/session/SessionActions';
import { setTimeLeft, startGame } from '../../store/game/GameActions';
import { v4 as uuid } from 'uuid';
import { once } from 'lodash';
import Timer from '../../components/timer/Timer';
import { useTimer } from './../../hooks/UseTimer';
import { updateGame } from './../../store/game/GameActions';
import { updateSettings } from './../../store/settings/SettingsActions';
import { setQuestions } from './../../store/question/QuestionActions';
import { Guesses } from './../../models/Guesses';

const Start = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const game = useSelector(state => state.game);
    const session = useSelector(state => state.session);
    const settings = useSelector(state => state.settings);
    const { questions } = useSelector(state => state.questions);
    const [name, setName] = useState('');
    const timeLeft = useSelector(state => state.game.timeLeft);
    const roomid = useRef(uuid());

    const joinRoom = useCallback((socket) => {
        socket.send(JSON.stringify({ route: 'joinRoom', roomId: roomid.current }));
    }, [roomid]);

    const emitAction = useWebSocket(joinRoom);

    useEffect(() => {
        const session = {
            id: roomid.current,
            playerId: uuid(),
        };

        dispatch(updateSession(session));
    }, [dispatch]);

    const onTick = useCallback((seconds) => emitAction(setTimeLeft(seconds)), [emitAction]);

    const onDone = useCallback(() => {
        const newPlayer = {
            id: session.playerId,
            name,
            score: 0,
            guess: Guesses.None
        }

        emitAction(updateGame({
            ...game,
            players: {
                ...game.players,
                [newPlayer.id]: newPlayer
            },
            turn: {
                ...game.turn,
                order: [...game.turn.order, newPlayer.id]
            },
            timeLeft: -1
        }));
        emitAction(updateSettings(settings));
        emitAction(setQuestions(questions));
        setTimeout(() => {
            emitAction(startGame());
        }, 1000);
    }, [emitAction, game, session, settings, questions, name]);

    useEffect(() => {
        if (game.started) {
            history.push('/game');
        }
    }, [history, game]);

    const startTimer = useTimer(5, onTick, onDone);

    const startGameTimer = useCallback(once(() => {
        startTimer();
    }), [startTimer]);

    return (
        <div className="join">
            <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}></input>
            <button onClick={startGameTimer}>Start Game</button>
            <Timer seconds={timeLeft}></Timer>
            {session.id &&
                <div>Join URL: {window.location.origin}/join/{session.id}</div>
            }
        </div>
    );
};

export default Start;