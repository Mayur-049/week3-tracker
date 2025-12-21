require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const listUsers = async () => {
    try {
        await connectDB();

        console.log('Fetching users...');
        const users = await User.find({}, 'name email role');

        if (users.length === 0) {
            console.log('No users found in the database.');
        } else {
            console.log('\n--- User List ---');
            users.forEach(user => {
                console.log(`Name: ${user.name} | Email: ${user.email} | Role: ${user.role}`);
            });
            console.log('-----------------\n');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

listUsers();
