import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    totalPoints: {
        type: Number,
        default: 0,
    },
    rank: {
        type: Number,
        default: 0,
    },
});

export default mongoose.model('User', userSchema);