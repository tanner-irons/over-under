import './Timer.scss';

import React from 'react';

const Timer = ({seconds}) => {
    return (
        seconds >= 0 ?
        <div className="timer">
            <div className="spinner"></div>
            <span className="seconds">{seconds}</span>
        </div>
        : null
    );
};

export default Timer;