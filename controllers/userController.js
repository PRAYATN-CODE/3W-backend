import User from '../models/User.js';

// Initialize 10 default users
export const initializeUsers = async (req, res) => {
    try {
        const defaultUsers = [
            'Rahul', 'Kamal', 'Sanak', 'Priya', 'Amit',
            'Neha', 'Vikram', 'Sonia', 'Ravi', 'Meera'
        ];

        const existingUsers = await User.countDocuments();
        if (existingUsers === 0) {
            await User.insertMany(defaultUsers.map(name => ({ name })));
            await updateRankings();
        }
        res.status(200).json({ message: 'Users initialized' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ rank: 1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add new user
export const addUser = async (req, res) => {
    try {
        const { name } = req.body;
        const user = new User({ name });
        await user.save();
        await updateRankings();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update rankings based on total points
export const updateRankings = async () => {
    const users = await User.find().sort({ totalPoints: -1 });
    let currentRank = 1;
    let lastPoints = null;

    for (let i = 0; i < users.length; i++) {
        if (lastPoints !== users[i].totalPoints) {
            currentRank = i + 1;
            lastPoints = users[i].totalPoints;
        }
        users[i].rank = currentRank;
        await users[i].save();
    }
};