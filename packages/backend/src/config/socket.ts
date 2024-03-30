// socketManager.ts
import { Server } from 'socket.io';
import { LobbyController } from '@controllers/LobbyController';

export const initializeSocket = (io: Server): void => {
  const lobbyController = new LobbyController();

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('@lobby/waiting', () => {
      lobbyController.handleWaiting(socket);
    });

    socket.on('@player/join', (roomId: string) => {
      const roomController = lobbyController.getRoomController(roomId);
      if (roomController) {
        roomController.handlePlayerJoin(socket);
      }
    });
  });
};
