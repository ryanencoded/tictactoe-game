import express from 'express';
import playerRoutes from '@routes/playerRoutes';

const router = express.Router();

router.use('/players', playerRoutes);

export default router;