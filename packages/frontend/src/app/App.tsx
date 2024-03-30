import { useEffect, useState } from 'react'

import { TicTacToeBoard } from '@components/TicTacToeBoard';
import { CellValue, TicTacToe, GameResult } from 'tictactoe-game';
import { initializeSocket } from "@utils/socket";

function App() {
  const [game, setGame] = useState(new TicTacToe());
  const socket = initializeSocket();

  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [gameState, setGameState] = useState<CellValue[][] | null>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  useEffect(() => {
    socket?.on('initialState', (initialState: any) => {
      setGameState(initialState.gameState);
    });

    socket?.on('updateGameState', (updatedGameState: any) => {
      setGameState(updatedGameState.gameState);
      setGameResult(updatedGameState.gameResult);
    });

    socket?.on('playerTurn', ({ player }) => {
      console.log(`It's player ${player}'s turn.`);
      // Update the state to enable/disable the board based on the player's turn
      setIsPlayerTurn(player === 1);
    });

    return () => {
      socket?.off('player-turn');
      socket?.off('initialState');
      socket?.off('updateGameState');
    };
  }, [socket]);

  const onMove = (state: CellValue[][]) => {
    socket?.emit('playerMove', { gameState: state });
  }

  const onStart = () => {
    // socket.connect();
    setGame(new TicTacToe());
    setIsPlayerTurn(true);
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
      <h1 className="text-3xl font-bold my-4">Tic Tac Toe</h1>
      <TicTacToeBoard game={game} onStart={onStart} onMove={onMove} isPlayerTurn={isPlayerTurn} />
    </div>
  )
}

export default App
