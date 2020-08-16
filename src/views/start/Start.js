import React from 'react';
import { addPlayer } from '../../store/game/GameActions';
import { Guesses } from './../../store/game/GameReducer';
import { useWebSocket } from '../../store/socket';
import { useSelector } from 'react-redux';

const Start = () => {
    const { id } = useSelector(state => state.session);
    
    const emitAction = useWebSocket((socket) => {
        socket.send(JSON.stringify({ route: 'joinRoom', roomId: id }));
    });

    const newPlayer = {
        id: 'one',
        name: 'Tanner',
        score: 0,
        guess: Guesses.None
    }

    emitAction(addPlayer(newPlayer));

    return (
        <div className="start"></div>
    );
};

export default Start;