import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRootSelector } from './UseRootSelector';

console.log(process.env.REACT_APP_WEBSOCKET_URL);
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL ?? "");

export const useWebSocket = (onOpen?) => {
    const dispatch = useDispatch();
    const { id } = useRootSelector(state => state.session);

    useEffect(
        () => {
            socket.onopen = () => {
                onOpen && onOpen(socket);
            };

            socket.onmessage = (event) => {
                console.log(event);
                const data = JSON.parse(event.data);
                const action = JSON.parse(data.data);
                if (action.type) {
                    dispatch(action);
                }
            };
        },
        [dispatch, onOpen]
    );

    return useCallback(
        action => socket.send(JSON.stringify({ route: 'dispatch', action, roomId: id })),
        [id]
    );
}