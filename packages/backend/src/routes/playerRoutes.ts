import express from 'express';
import { createPlayer, getPlayersList, createRandomPlayer } from '@controllers/PlayerController';

const playerRouter = express.Router();

playerRouter.post('/', createPlayer);
playerRouter.get('/', getPlayersList);
playerRouter.get('/random', createRandomPlayer)

export default playerRouter;