require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');
const fs = require('fs');

const dumpEmails = async () => {
    try {
        await connectDB();
        const users = await User.find({}, 'name email');
        const output = users.map(u => `${u.name}: ${u.email}`).join('\n');
        fs.writeFileSync('emails.txt', output, 'utf8');
        console.log('Done');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

dumpEmails();
