require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const cleanupOldUsers = async () => {
    try {
        await connectDB();

        // Get start of today (00:00:00)
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        console.log(`📅 Keeping users created after: ${startOfToday}`);

        // Find count first
        const count = await User.countDocuments({ createdAt: { $lt: startOfToday } });

        if (count === 0) {
            console.log('✅ No old users found to delete.');
            process.exit(0);
        }

        console.log(`⚠️ Found ${count} users created before today.`);

        // Delete them
        const result = await User.deleteMany({ createdAt: { $lt: startOfToday } });

        console.log(`🗑️ Successfully deleted ${result.deletedCount} old users.`);
        console.log('✅ Only users created TODAY remain.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

cleanupOldUsers();
