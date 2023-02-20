const express = require('express');

const path = require('path');
const adm = require('./admin')


const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('shop.js', adm.product);
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
});

module.exports = router;