import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const socket = new WebSocket('wss://lg274tz3m2.execute-api.us-east-1.amazonaws.com/Test');

export const useWebSocket = (onOpenCallback) => {
    const dispatch = useDispatch();
    const { id } = useSelector(state => state.session);

    useEffect(() => {
        socket.onopen = () => {
            onOpenCallback && onOpenCallback(socket);
        };

        socket.onmessage = (event) => {
            const action = JSON.parse(event.data);
            if (action.type) {
                dispatch(action);
            }
        };
    }, [dispatch, onOpenCallback, id]);

    return useCallback((action) => socket.send(JSON.stringify({ route: 'dispatch', action, roomId: id })), [id]);
}

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