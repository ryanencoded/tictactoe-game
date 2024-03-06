import { useEffect } from 'react'

import { TicTacToeBoard } from '@components/TicTacToeBoard';
import { CellValue, TicTacToe } from 'tictactoe-game';
import { initializeSocket } from "@utils/socket";

function App() {
  const game = new TicTacToe();
  const socket = initializeSocket();

  useEffect(() => {
    // Handle WebSocket events specific to this component, if needed
    socket?.on('message', (data) => {
      console.log(`Received WebSocket message: ${data}`);
      // Add your frontend WebSocket message handling logic here
    });

    return () => {
      socket?.off('message')
    };
  }, [socket]);

  const onMove = (state: CellValue[][]) => {
    socket?.emit('player-move', state);
  }

  const onStart = () => {
    // socket.connect();
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
      <h1 className="text-3xl font-bold my-4">Tic Tac Toe</h1>
      <TicTacToeBoard game={game} onStart={onStart} onMove={onMove} />
    </div>
  )
}

export default App
