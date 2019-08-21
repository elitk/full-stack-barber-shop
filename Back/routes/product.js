const express = require('express');
const router = express.Router();
const productModel = require('../models/product');

router.post('/add', (req, res) => {
    productModel.addProduct(req.body)
        .then((user) => {
            return res.status(200).json({ success: user })
        })
        .catch((err) => {
            return res.status(200).json({ err: err })
        })
})
router.get('/getproducts', (req, res) => {

    productModel.getAllProducts()
        .then((user) => {
            return res.status(200).json({ success: user })
        })
        .catch((err) => {
            return res.status(200).json({ err: err })
        })
})

module.exports = router