import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIoServer } from 'socket.io';

import { AppDataSource } from './data-source';
import routes from "@routes/index";
import { initializeSocket } from '@config/socket';

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

    initializeSocket(io);

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })