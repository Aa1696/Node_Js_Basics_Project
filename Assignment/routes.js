const http = require('http');
const fs = require('fs');
const requesthandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    const body = [];
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Node.js Basic Assignment </title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users' && method === 'POST') {
        res.write('<html>');
        res.write('<head><title>Node.js Basic Assignment for user</title></head>');
        res.write('<body><ul><li>user1</li><li>user2</li></ul></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === "/create-user" && method === 'POST') {
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedbody = Buffer.concat(body).toString();
            const message = parsedbody.split('=')[1];
            console.log(message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
};

module.exports.handler = requesthandler;
module.exports.sometext = "Hey how are tou doing";