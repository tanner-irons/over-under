import './Join.scss';

import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { updateSession } from '../../store/session/SessionActions';
import { addPlayer } from '../../store/game/GameActions';
import { useDispatch, useSelector } from 'react-redux';
import { useWebSocket } from '../../hooks/UseWebSocket';
import { useHistory, useParams } from 'react-router-dom';
import { once } from 'lodash';
import Timer from '../../components/timer/Timer';
import { Guesses } from './../../models/Guesses';
import AvatarSelect, { avatars } from '../../components/avatar-select/AvatarSelect';

const Join = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { roomid } = useParams();

    const { timeLeft, started } = useSelector(state => state.game);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(avatars[0]);

    const joinRoom = useCallback(
        socket => {
            const session = {
                id: roomid
            };

            dispatch(updateSession(session));
            socket.send(JSON.stringify({ route: 'joinRoom', roomId: roomid }));
        },
        [dispatch, roomid]
    );

    const emitAction = useWebSocket(joinRoom);

    const joinGame = useCallback(
        once(() => {
            const session = {
                playerId: uuid(),
            };

            dispatch(updateSession(session));

            const newPlayer = {
                id: session.playerId,
                name,
                avatar,
                score: 0,
                guess: Guesses.None
            }

            emitAction(addPlayer(newPlayer));
        }),
        [emitAction, dispatch, name, history]
    );

    useEffect(
        () => started && history.push('/game'),
        [history, started]
    );

    return (
        <div className="join">
            <AvatarSelect handleChange={setAvatar}></AvatarSelect>
            <input type="text" className="name" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}></input>
            <button onClick={joinGame}>Join Game</button>
            <Timer seconds={timeLeft}></Timer>
        </div>
    );
};

export default Join;