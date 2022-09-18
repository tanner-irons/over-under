import './Start.scss';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useWebSocket } from '../../hooks/UseWebSocket';
import { updateSession } from '../../store/session/SessionActions';
import { setTimeLeft, startGame } from '../../store/game/GameActions';
import { v4 as uuid } from 'uuid';
import { once } from 'lodash';
import Timer from '../../components/timer/Timer';
import { useTimer } from '../../hooks/UseTimer';
import { updateGame } from '../../store/game/GameActions';
import { updateSettings } from '../../store/settings/SettingsActions';
import { Guesses } from '../../models/Guesses';
import AvatarSelect, { avatars } from '../../components/avatar-select/AvatarSelect';
import Lobby from '../../components/lobby/Lobby';
import { useRootSelector } from '../../hooks/UseRootSelector';

const Start = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const game = useRootSelector(state => state.game);
    const session = useRootSelector(state => state.session);
    const settings = useRootSelector(state => state.settings);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(avatars[0]);
    const [startClicked, setStartClicked] = useState(false);

    const roomid = useRef(uuid());

    const joinRoom = socket => socket.send(JSON.stringify({ route: 'joinRoom', roomId: roomid.current }))

    const emitAction = useWebSocket(joinRoom);

    useEffect(
        () => {
            const session = {
                id: roomid.current,
                playerId: uuid(),
            };
            dispatch(updateSession(session));
        },
        [dispatch]
    );

    useEffect(
        () => {
            if (game.started && game.players[session.playerId]) {
                history.push('/game');
            }
        },
        [history, game.started, game.players, session.playerId]
    );

    const onTick = useCallback(
        seconds => emitAction(setTimeLeft(seconds)),
        [emitAction]
    );

    const onDone = useCallback(
        () => {
        const newPlayer = {
            id: session.playerId,
            name,
            avatar,
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
        setTimeout(() => {
            emitAction(startGame());
        }, 1000);
    }, 
    [emitAction, game, session, settings, name, avatar]
    );

    const startTimer = useTimer(settings.timeLimit, onTick, onDone);

    const startGameTimer = once(() => {
        setStartClicked(true);
        startTimer();
    })

    return (
        <div className="start">
            <div className="section section-game">
                <AvatarSelect handleChange={avatar => setAvatar(avatar)}></AvatarSelect>
                <input type="text" className="name" placeholder="Name" value={name} onChange={event => setName(event.target.value)}></input>
                <button disabled={!name || startClicked} onClick={startGameTimer}>{startClicked ? 'Game Started' : 'Start Game'}</button>
                {session.id &&
                    <div className="join-url">Join URL: {window.location.origin}/join/{session.id}</div>
                }
                <Timer seconds={game.timeLeft}></Timer>
            </div>
            <div className="section section-lobby">
                <Lobby players={Object.values<any>(game.players).filter(p => p.id !== session.playerId)}></Lobby>
            </div>
        </div>
    );
};

export default Start;