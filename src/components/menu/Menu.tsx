import './Menu.scss';

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateGame } from '../../store/game/GameActions';

const Menu = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const startGame = () => {
        dispatch(updateGame({
            started: false,
            players: {},
            turn: {
                order: [],
                activeTurnIndex: 0
            },
            currentQuestionIndex: 0
        }));
        history.push('/start');
    }

    return (
        <div className="menu">
            <div className="links">
                <button onClick={startGame}>New Game</button>
            </div>
        </div>
    );
};

export default Menu;