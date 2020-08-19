import './Timer.scss';

import React from 'react';

const Timer = (props) => {
    return (
        props.seconds >= 0 ?
        <div className="timer">
            <div className="spinner"></div>
            <span className="seconds">{props.seconds}</span>
        </div>
        : null
    );
};

export default Timer;