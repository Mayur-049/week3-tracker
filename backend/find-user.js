require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const findMayur = async () => {
    try {
        await connectDB();
        // Regex search for name starting with 'mayur' (case insensitive)
        const user = await User.findOne({ name: { $regex: /^mayur/i } });
        if (user) {
            console.log(`FOUND_EMAIL: ${user.email}`);
        } else {
            console.log('User not found');
        }
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

findMayur();
