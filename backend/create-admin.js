require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

const args = process.argv.slice(2);

if (args.length < 3) {
    console.log('Usage: node create-admin.js <Name> <Email> <Password> [Mobile] [Address]');
    console.log('Example: node create-admin.js "Super Admin" "admin@test.com" "securepass123"');
    process.exit(1);
}

const [name, email, password, mobile, address] = args;

const createAdmin = async () => {
    try {
        await connectDB();

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            console.log('❌ User with this email already exists.');
            console.log('👉 Use "node make-admin.js <email>" to upgrade an existing user instead.');
            process.exit(1);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin user
        user = new User({
            name,
            email,
            password: hashedPassword,
            mobile: mobile || '0000000000',
            address: address || 'Admin Address',
            role: 'admin' // Directly set as admin
        });

        await user.save();

        console.log('✅ New Admin User Created Successfully!');
        console.log(`👤 Name: ${name}`);
        console.log(`📧 Email: ${email}`);
        console.log(`🔑 Role: admin`);
        console.log('👉 You can now login with these credentials.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

createAdmin();
