import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIoServer } from 'socket.io';

import { AppDataSource } from './data-source';
import routes from "@routes/index";

const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = new SocketIoServer(server, {
  transports: ['websocket'],
  cors: {
    origin: "*"
  },
});

app.use(cors());

AppDataSource.initialize()
  .then(() => {
    app.use(express.json())

    app.use('/api', routes);

    io.on('connection', (socket) => {
      console.log('WebSocket connection established');
  
      // Handle WebSocket messages
      socket.on('message', (message) => {
        console.log(`Received WebSocket message: ${message}`);
        // Add your WebSocket message handling logic here
      });
  
      // Handle WebSocket disconnection
      socket.on('disconnect', () => {
        console.log('WebSocket connection closed');
        // Add any cleanup logic here
      });
    });

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })