import './Join.scss';

import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { updateSession } from '../../store/session/SessionActions';
import { addPlayer } from '../../store/game/GameActions';
import { useDispatch, useSelector } from 'react-redux';
import { useWebSocket } from '../../hooks/UseWebSocket';
import { useHistory, useParams } from 'react-router-dom';
import { once } from 'lodash';
import Timer from '../../components/timer/Timer';
import { Guesses } from '../../models/Guesses';
import AvatarSelect, { avatars } from '../../components/avatar-select/AvatarSelect';
import { useRootSelector } from '../../hooks/UseRootSelector';

const Join = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { roomid } = useParams<any>();

    const { timeLeft, started } = useRootSelector(state => state.game);
    const { playerId } = useRootSelector(state => state.session);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(avatars[0]);
    const [joined, setJoined] = useState(false);

    const joinRoom = socket => {
        const session = {
            id: roomid,
            playerId: uuid()
        };

        dispatch(updateSession(session));
        socket.send(JSON.stringify({ route: 'joinRoom', roomId: roomid }));
    };

    const emitAction = useWebSocket(joinRoom);

    const joinGame = useCallback(once(() => {
        const newPlayer = {
            id: playerId,
            name,
            avatar,
            score: 0,
            guess: Guesses.None
        }

        emitAction(addPlayer(newPlayer));
        setJoined(true);
    }), [playerId]);

    useEffect(
        () => {
            if (started) {
                history.push('/game')
            }
        },
        [history, started]
    );

    return (
        <div className="join">
            <AvatarSelect handleChange={avatar => setAvatar(avatar)}></AvatarSelect>
            <input type="text" className="name" placeholder="Name" value={name} onChange={event => setName(event.target.value)}></input>
            <button disabled={joined} onClick={joinGame}>{joined ? 'Game Joined' : 'Join Game'}</button>
            <Timer seconds={timeLeft}></Timer>
        </div>
    );
};

export default Join;