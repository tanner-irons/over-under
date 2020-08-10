import io from 'socket.io-client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const socket = io('http://localhost:80');

export function emitSocketDispatch(action) {
    socket.emit('Dispatch', action)
}

export function useSocketDispatch() {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('Dispatch', (action) => {
            dispatch(action);
        });

        return () => socket.off('Dispatch');
    }, [dispatch]);
}