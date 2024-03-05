import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = () => {
  if (!socket) {
    socket = io('http://localhost:3001', {
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
