export type PlayerType = 'X' | 'O';
export type CellValue = PlayerType | null;

export interface GameResult {
  winner?: PlayerType;
  draw: boolean;
}

export class TicTacToe {
  private gameState: CellValue[][];
  private currentPlayer: PlayerType;

  constructor(initialState?: CellValue[][], currentPlayer?: PlayerType) {
    this.gameState = initialState || [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.currentPlayer = currentPlayer ?? 'X';
  }

  public getCurrentPlayer(): PlayerType {
    return this.currentPlayer;
  }

  public getGameState(): CellValue[][] {
    return this.gameState.map(row => [...row]);
  }

  public makeMove(row: number, col: number): GameResult {
    if (this.isValidMove(row, col)) {
      this.gameState[row][col] = this.currentPlayer;
      const result = this.checkGameResult(row, col);

      if (result.winner === undefined) {
        this.switchPlayer();
      }

      return result;
    }

    // Instead of returning null, return the current game result
    return { winner: undefined, draw: false };
  }

  public resetGame(initialState?: CellValue[][]): void {
    this.gameState = initialState || [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    this.currentPlayer = 'X';
  }

  public getGameResult(): GameResult {
    const checkRow = this.checkRow(0) || this.checkRow(1) || this.checkRow(2);
    const checkCol = this.checkColumn(0) || this.checkColumn(1) || this.checkColumn(2);
    const checkDiagonal = this.checkDiagonal();

    if (checkRow || checkCol || checkDiagonal) {
      return { winner: this.currentPlayer, draw: false };
    }

    if (this.isGameDraw()) {
      return { winner: undefined, draw: true };
    }

    return { winner: undefined, draw: false };
  }

  private isValidMove(row: number, col: number): boolean {
    // Check if the cell is empty
    return this.gameState[row][col] === null;
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  private checkGameResult(row: number, col: number): GameResult {
    const player = this.currentPlayer;
    const checkRow = this.checkRow(row);
    const checkColumn = this.checkColumn(col);
    const checkDiagonal = this.checkDiagonal();

    if (checkRow || checkColumn || checkDiagonal) {
      return { winner: player, draw: false };
    }

    // Check for a draw
    if (this.isGameDraw()) {
      return { winner: undefined, draw: true };
    }

    // Continue playing
    return { winner: undefined, draw: false };
  }

  private checkRow(row: number): boolean {
    const player = this.currentPlayer;
    return this.gameState[row].every(cell => cell === player);
  }

  private checkColumn(col: number): boolean {
    const player = this.currentPlayer;
    return this.gameState.every(row => row[col] === player);
  }

  private checkDiagonal(): boolean {
    const player = this.currentPlayer;
    const diagonal1 = this.gameState.every((row, index) => row[index] === player);
    const diagonal2 = this.gameState.every((row, index) => row[this.gameState.length - 1 - index] === player);

    return diagonal1 || diagonal2;
  }

  private isGameDraw(): boolean {
    return this.gameState.every(row => row.every(cell => cell !== null));
  }
}

export default TicTacToe;
