// TicTacToe.test.ts
import TicTacToe, { CellValue, GameResult } from '../src/TicTacToe';

describe('TicTacToe', () => {
  let game: TicTacToe;

  beforeEach(() => {
    game = new TicTacToe();
  });

  test('initial state', () => {
    expect(game.getCurrentPlayer()).toBe('X');
    expect(game.getGameState()).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  });

  test('initial state - existing game state with current player', () => {
    game = new TicTacToe([
      ['X', null, null],
      [null, null, null],
      [null, null, null],
    ], 'O');

    expect(game.getCurrentPlayer()).toBe('O');
    expect(game.getGameState()).toEqual([
      ['X', null, null],
      [null, null, null],
      [null, null, null],
    ]);
  });

  test('make a move', () => {
    const result = game.makeMove(0, 0);
    expect(result.winner).toBeUndefined();
    expect(game.getCurrentPlayer()).toBe('O');
    expect(game.getGameState()).toEqual([
      ['X', null, null],
      [null, null, null],
      [null, null, null],
    ]);
  });

  test('make an invalid move', () => {
    game.makeMove(0, 0);
    const result = game.makeMove(0, 0);
    expect(result.winner).toBeUndefined();
    expect(game.getCurrentPlayer()).toBe('O');
    expect(game.getGameState()).toEqual([
      ['X', null, null],
      [null, null, null],
      [null, null, null],
    ]);
  });

  test('reset game', () => {
    game.makeMove(0, 0);
    game.resetGame();
    expect(game.getCurrentPlayer()).toBe('X');
    expect(game.getGameState()).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  });

  test('check game result', () => {
    const game = new TicTacToe();
    game.makeMove(0, 0); // X
    game.makeMove(0, 1); // O
    game.makeMove(0, 2); // X
    game.makeMove(1, 1); // O
    game.makeMove(1, 0); // X
    game.makeMove(1, 2); // O

    const gameResult: GameResult = game.getGameResult();
    const gameState = game.getGameState();

    expect(gameResult.winner).toBeUndefined();
    expect(gameResult.draw).toEqual(false);
    expect(gameState).toEqual([
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      [null, null, null],
    ]);
  });

  test('check game result - X wins diagonally', () => {
    const game = new TicTacToe();
    game.makeMove(0, 0); // X
    game.makeMove(0, 1); // O
    game.makeMove(1, 1); // X
    game.makeMove(0, 2); // O
    game.makeMove(2, 2); // X

    const gameState = game.getGameState();
    const gameResult: GameResult = game.getGameResult();

    expect(gameResult.winner).toEqual('X');
    expect(gameResult.draw).toEqual(false);
    expect(gameState).toEqual([
      ['X', 'O', 'O'],
      [null, 'X', null],
      [null, null, 'X'],
    ])
  });

  test('check game result - O wins horizontally', () => {
    const game = new TicTacToe();

    game.makeMove(2, 0); // X
    game.makeMove(1, 0); // O
    game.makeMove(0, 1); // X
    game.makeMove(1, 1); // O
    game.makeMove(2, 2); // X
    game.makeMove(1, 2); // O

    const gameState = game.getGameState();
    const gameResult: GameResult = game.getGameResult();

    expect(gameResult.winner).toEqual('O');
    expect(gameResult.draw).toEqual(false);
    expect(gameState).toEqual([
      [null, 'X', null],
      ['O', 'O', 'O'],
      ['X', null, 'X'],
    ])
  });

  test('check game result - draw', () => {
    const game = new TicTacToe();
    game.makeMove(0, 0); // X
    game.makeMove(0, 1); // O
    game.makeMove(2, 2); // X
    game.makeMove(1, 1); // O
    game.makeMove(2, 1); // X
    game.makeMove(2, 0); // O
    game.makeMove(0, 2); // X
    game.makeMove(1, 2); // O
    game.makeMove(1, 0); // X

    const gameState = game.getGameState();
    const gameResult: GameResult = game.getGameResult();

    expect(gameResult.winner).toBeUndefined();
    expect(gameResult.draw).toEqual(true);
    expect(gameState).toEqual([
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X'],
    ])
  });
});
