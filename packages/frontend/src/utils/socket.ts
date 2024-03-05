import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_WS_URL, {
      transports: ['websocket'],
      autoConnect: false
    });

    // Handle global socket events, if needed
    socket.on('connect', () => {
      console.log('WebSocket connection opened');
    });

    socket.on('disconnect', (reason) => {
      console.log('WebSocket connection closed:', reason);
      // Add any cleanup logic here
    });
  }

  return socket;
};
