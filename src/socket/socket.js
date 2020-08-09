import io from 'socket.io-client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const socket = io('http://localhost:80');

export function emitDispatch(action) {
    socket.emit('Action', action)
}

export function useDispatchSubscription() {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('Action', (action) => {
            dispatch(action);
        });

        return () => socket.off('Action');
    }, [dispatch]);

    return () => socket.off('Action');
}