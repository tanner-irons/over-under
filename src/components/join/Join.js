import './Join.scss';

import React, { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { updateSession } from './../../store/session/SessionActions';
import { Guesses } from '../../store/game/GameReducer';
import { addPlayer } from '../../store/game/GameActions';
import { useDispatch } from 'react-redux';
import { useWebSocket } from './../../store/socket';

const Join = () => {
    const dispatch = useDispatch();
    const emitAction = useWebSocket();
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
    }, [emitAction, dispatch, name]);

    return (
        <div className="join">
            <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}></input>
            <button onClick={joinGame}>Join Game</button>
        </div>
    );
};

export default Join;