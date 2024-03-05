import { useEffect } from 'react'
import './App.css'

import { initializeSocket } from "@utils/socket";

function App() {
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

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="card">
        <button onClick={() => socket.connect()}>
          Connect
        </button>
      </div>
    </>
  )
}

export default App
