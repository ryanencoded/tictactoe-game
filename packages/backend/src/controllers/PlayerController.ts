// src/controllers/PlayerController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Player } from '@entities/Player';

export const createPlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ error: 'Username is required for creating a player.' });
      return;
    }

    const playerRepository = AppDataSource.getRepository(Player);
    const newPlayer = playerRepository.create({ username });
    await playerRepository.save(newPlayer);

    res.status(201).json(newPlayer);
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPlayersList = async (_req: Request, res: Response): Promise<void> => {
  try {
    const playerRepository = AppDataSource.getRepository(Player);
    const players = await playerRepository.find();

    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createRandomPlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const playerRepository = AppDataSource.getRepository(Player);
    const newPlayer = playerRepository.create({
      username: 'randomtest',
      score: 100,
    });
    await playerRepository.save(newPlayer);
    res.json(newPlayer);
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}