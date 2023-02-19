const express = require('express');
const { dirname } = require('path');

const path = require('path');

const router = express.Router();

router.get('/add_product', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});
router.post('/add_product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});
module.exports = router;