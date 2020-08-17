import React, { useCallback, useState } from 'react';
import { addPlayer } from '../../store/game/GameActions';
import { Guesses } from './../../store/game/GameReducer';
import { useWebSocket } from '../../store/socket';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateSession } from './../../store/session/SessionActions';

import { v4 as uuid } from 'uuid';
const Start = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { roomid } = useParams();
    const { playerId } = useSelector(state => state.session);
    const [name, setName] = useState('');

    const joinRoom = useCallback((socket) => {
        const session = {
            id: roomid,
            playerId: uuid(),
        };

        dispatch(updateSession(session));
        
        socket.send(JSON.stringify({ route: 'joinRoom', roomId: roomid }));
    }, [dispatch, roomid]);

    const emitAction = useWebSocket(joinRoom);

    const startGame = useCallback(() => {
        const newPlayer = {
            id: playerId,
            name,
            score: 0,
            guess: Guesses.None
        }

        emitAction(addPlayer(newPlayer));

        setTimeout(() => {
            history.push('/game');
        }, 1000);
    }, [emitAction, history, playerId, name]);

    return (
        <div className="start">

        </div>
    );
};

export default Start;