import React, { useCallback, useEffect, useState } from 'react';

export const useTimer = (seconds: number, onTick: (timeLeft: number) => void, onDone: () => void) => {
    const [timerStarted, setTimerStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(
        () => {
            if (timerStarted) {
                onTick && onTick(timeLeft);
            }
        },
        [onTick, timeLeft, timerStarted]
    );

    useEffect(
        () => {
            if (timerStarted && timeLeft === -1) {
                onDone && onDone();
                setTimerStarted(false);
            }
        },
        [onDone, timeLeft, timerStarted]
    );

    useEffect(
        () => {
            let tickInterval: NodeJS.Timer | undefined;

            if (timerStarted) {
                tickInterval = setInterval(() => {
                    setTimeLeft(timeLeft - 1);
                }, 1000);
            }
            else {
                clearInterval(tickInterval);
            }

            return () => clearInterval(tickInterval);
        },
        [timerStarted, timeLeft]
    );

    return useCallback(
        () => {
            setTimeLeft(seconds);
            setTimerStarted(true);
        },
        [seconds]
    );
}