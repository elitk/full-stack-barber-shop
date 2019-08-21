const express = require('express');
const router = express.Router();
const clientModel = require('../models/client');
const productModel = require('../models/product')
const jwt = require('jsonwebtoken');
const RegisterValidation = require('../validation/users/RegisterValidation')
var token;

router.post('/register', (req, res) => {
    const { error, isValid } =  RegisterValidation(req.body.obj)
    if (!isValid) {
        return res.status(207).json(error)
    }
    clientModel.registerClient(req.body.obj)
        .then((user) => {
            return res.status(200).json({ success: user })
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
})

router.post('/addtocart', (req, res) => {
    clientModel.addToCart(req.body)
        .then((user) => {
            return res.status(200).json({ success: user })
        })
        .catch((err) => {
            return res.status(401).json({ err: "id not found" })
        })
})

router.get('/me', (req, res) => {
    jwt.verify(token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(200).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        return res.status(200).json(decoded);
    });
})

router.post('/login', (req, res) => {
    clientModel.login(req.body)
        .then((user) => {
            if (user.isSucces) {
                let userDetails = {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }
                token = jwt.sign({ userDetails: userDetails }, 'secret', { expiresIn: 86400 }); // Signing the token
                res.json({
                    sucess: true,
                    err: null,
                    token: token
                });
            }
            return res.status(200).json(token)
        })
        .catch((err) => {
            return res.status(400).json({ err: err })
        })
})

router.get('/logout', (req, res) => {
    return res.json(clientModel.clearCookie())
})

router.post("/getuser", verifyToken, (req, res) => {
    return res.status(200).json(decodedToken);
});
let decodedToken = "";
function verifyToken(req, res, next) {
    let token = req.body.token
    jwt.verify(token, "secret", function (err, tokendata) {
        if (err) {
            return res.status(207).json({ message: "unrecognaized request" });
        }
        if (tokendata) {
            decodedToken = tokendata;
            next();
        }
    });
}

router.post('/getclientproducts', (req, res) => {
    clientModel.getCustomerProducts(req.body)
        .then((userCart) => {
            return res.status(200).json(userCart)
        })
        .catch((err) => {
            return res.status(207).json({ err: err })
        })
})

router.post('/buyfromcart', (req, res) => {
    productModel.getAllProducts()
        .then((productsArray)=>{
            clientModel.buyFromCart(productsArray,req.body.userId)
            .then((user) => {
                return res.status(200).json(user);
            })
            .catch((err) => {
                return res.status(207).json({ err: err })
            })
        })
  })

router.post('/removefromcart', (req, res) => {
    clientModel.removefromcart(req.body)
        .then((user) => {
            return res.status(200).json(user)
        })
        .catch((err) => {
            return res.status(207).json({ err: err })
        })
})

module.exports = router