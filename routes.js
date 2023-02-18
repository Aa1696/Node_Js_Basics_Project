const fs = require('fs');
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    const body = [];
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter the message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === "POST") {
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            //const new_message = message.split('+');
            fs.writeFileSync('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });

    }
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<html>');
    // res.write('<head><title>My first html page on node.js</title></head>');
    // res.write('<body><h1>I am learning java script</h1></body>')
    // res.write('</html>');
    // res.end();
};
//module.exports = requestHandler;
/*module.exports = {
    handler: requestHandler,
    sometext: 'Some hard text are being written'
}
*/
/*module.exports.handler=requestHandler;
module.exports.sometext='I have wriiten some hard code';
*/
exports.handler = requestHandler;
exports.sometext = 'Some hard text has been written';
