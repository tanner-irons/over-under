import './Menu.scss';

import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const Menu = () => {
    const history = useHistory();

    const startGame = useCallback(
        () => history.push('/start'),
        [history]
    );

    return (
        <div className="menu">
            <div className="links">
                <button onClick={startGame}>New Game</button>
            </div>
        </div>
    );
};

export default Menu;