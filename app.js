const http = require('http');
const path = require('path');
const body_parser = require('body-parser');
const express = require('express');
const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');

const utility = require('./util/helper');

const db = require('./util/database');

const app = express();

// db.execute('select * from product').then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });

app.use(body_parser.urlencoded({ extended: false }));

app.use('/admin', adminroutes.router);
app.use(shoproutes);
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

const server = http.createServer(app);
server.listen(3000);