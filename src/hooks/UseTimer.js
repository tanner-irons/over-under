import { useCallback } from 'react';

export const useTimer = (seconds, onTick, onDone) => {
    return useCallback(() => {
        onTick && onTick(seconds);
        const tickInterval = setInterval(() => {
            seconds--;
            if (seconds === -1) {
                onDone && onDone();
                clearInterval(tickInterval);
            }
            onTick && onTick(seconds);
        }, 1000);
    }, [seconds, onTick, onDone]);
}