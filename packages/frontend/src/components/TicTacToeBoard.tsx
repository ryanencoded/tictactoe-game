import React, { useState, useEffect } from 'react';
import { TicTacToe, CellValue, GameResult } from 'tictactoe-game';

interface TicTacToeBoardProps {
  game: TicTacToe;
  onMove: (state: CellValue[][]) => void;
  onStart: () => void;
}

export const TicTacToeBoard: React.FC<TicTacToeBoardProps> = ({ game, onMove, onStart }) => {
  const [gameState, setGameState] = useState<CellValue[][]>(game.getGameState());
  const [gameResult, setGameResult] = useState<GameResult>(game.getGameResult());

  useEffect(() => {
    setGameState(game.getGameState());
  }, [game]);

  const handleCellClick = (row: number, col: number) => {
    // Return if game has a winner
    if(gameResult.winner) return;
    // Make the move
    game.makeMove(row, col);
    // Obtain current state and result
    const currentState = game.getGameState();
    const currentResult = game.getGameResult();
    // Send the update for the board
    setGameState(currentState);
    setGameResult(currentResult);
    onMove(currentState)
  };

  const onPlayAgain = () => {
    game.resetGame();
    // Obtain current state and result
    const currentState = game.getGameState();
    const currentResult = game.getGameResult();
    // Send the update for the board
    setGameState(currentState);
    setGameResult(currentResult);
    // Start
    onStart();
  }

  if(gameResult.winner) {
    return (
      <div className="flex items-center justify-center flex-col">
        <h3 className="text-2xl my-4">{gameResult.winner} Wins!</h3>
        <button 
          className="bg-green-200 p-4 text-1xl font-bold cursor-pointer" 
          onClick={onPlayAgain}
        >Play Again</button>
      </div>
    )
  }

  if(gameResult.draw) {
    return (
      <div className="flex items-center justify-center flex-col">
        <h3 className="text-2xl m-4">It's a draw!</h3>
        <button 
          className="bg-green-200 p-4 text-1xl font-bold cursor-pointer" 
          onClick={onPlayAgain}
        >Play Again</button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {gameState.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className="bg-gray-200 p-4 text-4xl font-bold cursor-pointer flex items-center justify-center h-[4rem]"
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            {cell === 'X' && <span className="text-blue-500">{cell}</span>}
            {cell === 'O' && <span className="text-red-500">{cell}</span>}
          </div>
        ))
      ))}
    </div>
  );
};

export default TicTacToeBoard;
