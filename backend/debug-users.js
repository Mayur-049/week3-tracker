require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const debugUsers = async () => {
    try {
        await connectDB();
        console.log(`Connected to DB: ${mongoose.connection.name}`);
        console.log(`Host: ${mongoose.connection.host}`);

        const users = await User.find({});
        console.log(`Total users found: ${users.length}`);

        users.forEach(u => {
            console.log(`- "${u.email}" (Role: ${u.role}) ID: ${u._id}`);
        });

        const target = 'mayurpatel85516@gmail.com';
        const specific = await User.findOne({ email: target });
        console.log(`Specific search for '${target}': ${specific ? 'FOUND' : 'NOT FOUND'}`);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugUsers();
