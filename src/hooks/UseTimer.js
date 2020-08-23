import { useCallback, useEffect, useState } from 'react';

export const useTimer = (seconds, onTick, onDone) => {
    const [timerStarted, setTimerStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        if (timerStarted) {
            onTick && onTick(timeLeft);
        }
    }, [onTick, timeLeft, timerStarted]);

    useEffect(() => {
        if (timerStarted && timeLeft === -1) {
            onDone && onDone();
            setTimerStarted(false);
        }
    }, [onDone, timeLeft, timerStarted]);

    useEffect(() => {
        let tickInterval;

        if (timerStarted) {
            tickInterval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        }
        else {
            clearInterval(tickInterval);
        }

        return () => clearInterval(tickInterval);
    }, [timerStarted, timeLeft]);
    
    return useCallback(() => {
        setTimeLeft(seconds);
        setTimerStarted(true);
    }, [seconds]);
}