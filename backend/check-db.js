require('dotenv').config();
const mongoose = require('mongoose');

console.log('--- Database Configuration Check ---');
console.log(`Node Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`MONGO_URI present? ${process.env.MONGO_URI ? 'YES' : 'NO'}`);

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
if (!process.env.MONGO_URI) {
    console.log('⚠️  WARNING: MONGO_URI is not set in .env file.');
    console.log(`👉 Defaulting to Localhost: ${uri}`);
} else {
    // Mask the password if present
    const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
    console.log(`✅ Using provided MONGO_URI: ${maskedUri}`);
}

mongoose.connect(uri)
    .then(() => {
        console.log('✅ Connection Successful!');
        console.log(`📦 Database Name: ${mongoose.connection.name}`);
        console.log(`💻 Host: ${mongoose.connection.host}`);
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Connection Failed:', err.message);
        process.exit(1);
    });
