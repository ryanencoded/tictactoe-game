// lobbyController.ts
import { Socket } from 'socket.io';
import { RoomController } from './RoomController';
import { v4 as uuidv4 } from 'uuid';

export class LobbyController {
  private waitingUsers: Socket[];
  private rooms: { [roomId: string]: RoomController };

  constructor() {
    this.waitingUsers = [];
    this.rooms = {};
  }

  public handleWaiting(socket: Socket): void {
    this.waitingUsers.push(socket);
    console.log(`User ${socket.id} is now waiting in the lobby`);

    if (this.waitingUsers.length >= 2) {
      const room = `room-${uuidv4()}`;
      const players = [this.waitingUsers.shift()!, this.waitingUsers.shift()!];
      const roomController = new RoomController(room, players);
      this.rooms[room] = roomController;

      // Notify players in the room to start the game
      players.forEach((player) => {
        player.join(room);
        player.emit('@player/start-game', { room });
      });

      // Notify the first player to make a move
      roomController.handlePlayerMove(players[0], { row: 0, col: 0 });
    }
  }

  public getRoomController(roomId: string): RoomController | undefined {
    return this.rooms[roomId];
  }
}
