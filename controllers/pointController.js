import PointHistory from '../models/PointHistory.js';
import User from '../models/User.js';
import { updateRankings } from './userController.js';

// Claim random points for a user
export const claimPoints = async (req, res) => {
    try {
        const { userId } = req.body;
        const points = Math.floor(Math.random() * 10) + 1;

        // Update user's total points
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.totalPoints += points;
        await user.save();

        // Save point history
        const pointHistory = new PointHistory({
            userId,
            points,
        });
        await pointHistory.save();

        // Update rankings
        await updateRankings();

        res.status(200).json({ points, totalPoints: user.totalPoints });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get point history for a user
export const getPointHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const history = await PointHistory.find({ userId })
            .populate('userId', 'name')
            .sort({ timestamp: -1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};