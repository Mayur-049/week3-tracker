const http = require('http');

function request(options, data = null) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body }));
        });
        req.on('error', reject);
        if (data) req.write(data);
        req.end();
    });
}

async function fixUser() {
    try {
        console.log("Getting all users...");
        const getRes = await request({
            hostname: 'localhost', port: 5000, path: '/api/User', method: 'GET'
        });

        const users = JSON.parse(getRes.body);
        const targetUser = users.find(u => u.email === 'pr@gmail.com');

        if (targetUser) {
            console.log(`Found user: ${targetUser._id}. Deleting...`);
            await request({
                hostname: 'localhost', port: 5000, path: `/api/User/${targetUser._id}`, method: 'DELETE'
            });
            console.log("User deleted.");
        } else {
            console.log("User not found (that's okay, we will create it).");
        }

        console.log("Registering user...");
        const regData = JSON.stringify({
            name: "Pr User",
            email: "pr@gmail.com",
            password: "123456",
            mobile: "9999999999",
            address: "Test Address"
        });

        const regRes = await request({
            hostname: 'localhost', port: 5000, path: '/api/User/register', method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': regData.length }
        }, regData);

        console.log("Registration response:", regRes.body);

    } catch (err) {
        console.error("Error:", err);
    }
}

fixUser();
