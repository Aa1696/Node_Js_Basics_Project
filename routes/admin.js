const express = require('express');
const { dirname } = require('path');

const path = require('path');

const router = express.Router();

const product = [];

router.get('/add_product', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add_product.html'));
});
router.post('/add_product', (req, res, next) => {
    product.push({ title: req.body.title })
    res.redirect('/');
});
exports.router = router;
exports.product = product;