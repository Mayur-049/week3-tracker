const http = require('http');

const data = JSON.stringify({
  name: "Pr User",
  email: "pr@gmail.com",
  password: "123456",
  mobile: "9999999999",
  address: "Test Address"
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/User/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log("Attempting to register user...");

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Response: ${body}`);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();
