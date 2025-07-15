import express from 'express';
import { claimPoints, getPointHistory } from '../controllers/pointController.js';
import {
    addUser,
    getUsers,
    initializeUsers,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/users/initialize', initializeUsers);
router.get('/users', getUsers);
router.post('/users', addUser);
router.post('/points/claim', claimPoints);
router.get('/points/history/:userId', getPointHistory);

export default router;