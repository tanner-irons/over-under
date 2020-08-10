import './Timer.scss';

import React, { useEffect, useState, useCallback } from 'react';

const Timer = (props) => {
    const [timer, setTimer] = useState(props.seconds);
    const handleTick = useCallback(() => {
        if (timer === 0) {
            !props.readOnly && props.handleFinish();
            return;
        }
        setTimer(timer - 1);
    }, [props, timer]);

    useEffect(() => {
        let tickInterval = setInterval(handleTick, 1000);
        return () => clearInterval(tickInterval);
    }, [handleTick])

    return (
        <div className="timer">
            <div className="spinner"></div>
            <span className="seconds">{timer}</span>
        </div>
    );
};

export default Timer;