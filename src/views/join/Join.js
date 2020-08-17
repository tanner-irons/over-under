import './Join.scss';

import React, { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { updateSession } from '../../store/session/SessionActions';
import { Guesses } from '../../store/game/GameReducer';
import { addPlayer } from '../../store/game/GameActions';
import { useDispatch } from 'react-redux';
import { useWebSocket } from '../../store/socket';
import { useHistory, useParams } from 'react-router-dom';

const Join = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { roomid } = useParams();

    const joinRoom = useCallback((socket) => {
        const session = {
            id: roomid
        };

        dispatch(updateSession(session));

        socket.send(JSON.stringify({ route: 'joinRoom', roomId: roomid }));
    }, [dispatch, roomid]);

    const emitAction = useWebSocket(joinRoom);
    const [name, setName] = useState('');

    const joinGame = useCallback(() => {
        const session = {
            playerId: uuid(),
        };

        dispatch(updateSession(session));

        const newPlayer = {
            id: session.playerId,
            name,
            score: 0,
            guess: Guesses.None
        }

        emitAction(addPlayer(newPlayer));

        setTimeout(() => {
            history.push('/game');
        }, 2000);
    }, [emitAction, dispatch, name, history]);

    return (
        <div className="join">
            <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}></input>
            <button onClick={joinGame}>Join Game</button>
        </div>
    );
};

export default Join;