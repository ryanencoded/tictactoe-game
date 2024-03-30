// roomController.ts
import { Socket } from 'socket.io';

export class RoomController {
  private players: Socket[];
  private currentPlayerIndex: number;

  constructor(roomId: string, players: Socket[]) {
    this.players = players;
    this.currentPlayerIndex = 0;
  }

  public handlePlayerJoin(socket: Socket): void {
    if (this.players.length < 2) {
      this.players.push(socket);
      console.log(`User ${socket.id} joined room ${this.getRoomId()}`);

      // Notify all players in the room about the new player
      this.players.forEach((player) => {
        player.emit('@player/join', { playerId: socket.id });
      });
    }
  }

  public handlePlayerMove(socket: Socket, move: { row: number; col: number }): void {
    // Add your move handling logic here
    // Notify other players about the move
    this.players
      .filter((player) => player.id !== socket.id)
      .forEach((player) => {
        player.emit('@player/move', move);
      });

    // Switch to the next player
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
  }

  private getRoomId(): string {
    return this.players[0].rooms.keys().next().value;
  }
}
