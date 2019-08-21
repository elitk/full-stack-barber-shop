const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    id: {
        type: String,
        min: 2,
        max: 25,
        require: true
    },
    productName: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    productPrice: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    productPhoto: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    updQuantity: {
        type: Number,
        default: 100

    },
    date: {
        type: Date,
        default: Date.now()
    },

});

const productTable = mongoose.model('product', productSchema);

addProduct = (data) => {

    let p = new Promise((resolve, reject) => {

        productTable.findOne({ id: data.id })
            .then((user) => {
                if (user) {
                    return reject("the user exist");
                }
                let productObj = productTable({
                    id: data.id,
                    productName: data.productName,
                    productPrice: data.productPrice,
                    productPhoto: data.productPhoto
                });

                productObj.save()
                return resolve("add successfuly")
            })
    })
    return p;
}
getAllProducts = () => {
    let p = new Promise((resolve, reject) => {
        productTable.find({})
            .then((user) => {
                if (user) {
                    return resolve(user);
                }
                return reject("no have product");
            })
    })
    return p;
}
buyfromcart = (id, qty) => {
        productTable.findOne({ id: id })
            .then((product) => {
                if (product) {
                    product.updQuantity -= qty
                    product.save();
                }
    })
}
module.exports = {
    addProduct: addProduct,
    getAllProducts: getAllProducts,
    buyfromcart: buyfromcart
}
