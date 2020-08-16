import './Menu.scss';

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSession } from './../../store/session/SessionActions';

const Menu = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const session = useSelector(state => state.session);
    const setSessionOne = () => dispatch(updateSession({ playerId: 'one' }));
    const setSessionTwo = () => dispatch(updateSession({ playerId: 'two' }));

    return (
        <div className="menu">
            <div className="links">
                <button onClick={() => history.push('/new')}>New Game</button>
                <button onClick={() => history.push('/game')}>Game</button>
                <button className={session.playerId === 'one' ? "active" : ""} onClick={setSessionOne}>Session 1</button>
                <button className={session.playerId === 'two' ? "active" : ""} onClick={setSessionTwo}>Session 2</button>
            </div>
        </div>
    );
};

export default Menu;