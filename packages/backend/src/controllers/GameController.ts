// gameController.ts
import { Socket } from 'socket.io';
import { TicTacToe, GameResult } from 'tictactoe-game';

export class GameController {
  private game: TicTacToe;
  private players: Socket[];
  private currentPlayerIndex: number;

  constructor(players: Socket[]) {
    this.game = new TicTacToe();
    this.players = players;
    this.currentPlayerIndex = 0;
  }

  public handleMove(socket: Socket, moveData: { row: number; col: number }): void {
    // Implement the logic to update the game state based on the move
    const updatedGameState = this.game.makeMove(moveData.row, moveData.col);

    // Notify all players about the updated game state
    this.players.forEach((player) => {
      player.emit('@room/game-state', { gameState: updatedGameState });
    });

    // Check for a winner or draw
    const gameResult: GameResult = this.game.getGameResult();
    if (gameResult.winner || gameResult.draw) {
      // Notify players about the game result
      this.players.forEach((player) => {
        player.emit('@room/game-result', { winner: gameResult.winner, draw: gameResult.draw });
      });

      // Reset the game or perform other actions
      // ...

      // Notify players to start a new game
      this.players.forEach((player) => {
        player.emit('@player/start-new-game');
      });
    } else {
      // Switch to the next player's turn
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

      // Notify the next player to make a move
      this.players[this.currentPlayerIndex].emit('@player/turn');
    }
  }
}