require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const targetEmail = 'mayurpatel85516@gmail.com';

const setSoleAdmin = async () => {
    try {
        await connectDB();

        console.log(`🔍 Processing request for Sole Admin: ${targetEmail}`);

        // 1. Find the target user
        const targetUser = await User.findOne({ email: targetEmail });

        if (!targetUser) {
            console.error(`❌ User with email ${targetEmail} NOT FOUND!`);
            console.log('👉 Please register this user first via the website.');
            process.exit(1);
        }

        // 2. Set everyone else to 'user'
        const resetResult = await User.updateMany(
            { email: { $ne: targetEmail } }, // $ne means Not Equal
            { $set: { role: 'user' } }
        );
        console.log(`📉 Demoted ${resetResult.modifiedCount} other admins/users to standard 'user' role.`);

        // 3. Set target user to 'admin'
        targetUser.role = 'admin';
        await targetUser.save();

        console.log(`👑 SUCCESS: ${targetUser.name} (${targetUser.email}) is now the ONLY Admin.`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

setSoleAdmin();
