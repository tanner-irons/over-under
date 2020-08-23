import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const socket = new WebSocket('wss://lg274tz3m2.execute-api.us-east-1.amazonaws.com/Test');

export const useWebSocket = (onOpen) => {
    const dispatch = useDispatch();
    const { id } = useSelector(state => state.session);

    useEffect(() => {
        socket.onopen = () => {
            onOpen && onOpen(socket);
        };

        socket.onmessage = (event) => {
            const action = JSON.parse(event.data);
            if (action.type) {
                dispatch(action);
            }
        };
    }, [dispatch, onOpen]);

    return useCallback((action) => {
        socket.send(JSON.stringify({ route: 'dispatch', action, roomId: id }))
    }, [id]);
}