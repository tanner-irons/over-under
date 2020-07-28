import React from 'react';
import { useHistory } from 'react-router-dom';

const Menu = () => {
    const history = useHistory();

    return (
        <div className="menu">
            <div className="links">
                <button onClick={() => history.push('/new')}>New Game</button>
            </div>
        </div>
    );
};

export default Menu;