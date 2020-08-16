import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimer } from './game/GameActions';


export function useWebSocket(onOpenCallback) {
    const dispatch = useDispatch();
    const { id } = useSelector(state => state.session);
    const socket = useRef(null);

    useEffect(() => {
        socket.current = new WebSocket('wss://lg274tz3m2.execute-api.us-east-1.amazonaws.com/Test');

        socket.current.onopen = () => {
            onOpenCallback && onOpenCallback(socket.current);
        };

        socket.current.onmessage = (event) => {
            dispatch(JSON.parse(event.data));
        };

        return () => socket.current.close();
    }, [dispatch, onOpenCallback, id, socket, ]);

    return useCallback((action) => socket.current.send(JSON.stringify({ route: 'dispatch', action, roomId: id })), [id, socket]);
}

export function useTimer(seconds, callback) {
    const emitAction = useWebSocket();

    return useCallback(() => {
        emitAction(setTimer(seconds));
        const tickInterval = setInterval(() => {
            seconds--;
            if (seconds === -1) {
                callback && callback();
                clearInterval(tickInterval);
            }
            emitAction(setTimer(seconds));
        }, 1000);
    }, [emitAction, seconds, callback]);
}