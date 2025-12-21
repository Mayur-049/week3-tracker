require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

// Get email from command line args
const targetEmail = process.argv[2];

if (!targetEmail) {
    console.log('Usage: node make-admin.js <email_address>');
    process.exit(1);
}

const makeAdmin = async () => {
    try {
        await connectDB();

        console.log(`🔍 Searching for user with email: ${targetEmail}`);

        const user = await User.findOne({ email: targetEmail });

        if (!user) {
            console.error('❌ User not found!');
            process.exit(1);
        }

        console.log(`✅ User found: ${user.name} (${user.role})`);

        if (user.role === 'admin') {
            console.log('⚠️ User is already an admin.');
            process.exit(0);
        }

        user.role = 'admin';
        await user.save();

        console.log('🎉 Success! User role updated to ADMIN.');
        console.log(`👉 Please log out and log back in to see the changes.`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

makeAdmin();
