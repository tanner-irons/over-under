import './Timer.scss';

import React from 'react';

const Timer = (props) => {
    return (
        <div className="timer">
            <div className="spinner"></div>
            <span className="seconds">{props.seconds}</span>
        </div>
    );
};

export default Timer;