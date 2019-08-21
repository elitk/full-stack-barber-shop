const mongoose = require('mongoose');
const productModel = require('../models/product');
const orderModel = require('../models/orderDetails');
const clientScheme = mongoose.Schema({
    id: {
        type: String,
        min: 2,
        max: 25,
        require: true
    },
    firstName: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    lastName: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    adress: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    city: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    password: {
        type: String,
        min: 5,
        max: 25,
        required: true
    },
    cart: {
        type: [],
        default: []
    },
    date: {
        type: Date,
        default: Date.now()
    },
   });

  const clientTable = mongoose.model('client', clientScheme);

registerClient = (data) => {
    let p = new Promise((resolve, reject) => {
        clientTable.findOne({ id: data.id })
            .then((user) => {
                if (user) {
                    return reject({ err: "the user exist" });
                }
                let clientObj = clientTable({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    adress: data.adress,
                    city: data.city,
                    password: data.password,
                });
                clientObj.save()
                return resolve(clientObj)
            }).catch((err) => {
                return reject({ err: "login failed" })
            })
    })
    return p;
}

login = (data) => {
    let p = new Promise((resolve, reject) => {
        let obj = {
            isSucces: false,
            userId: ''
        }
        clientTable.findOne({ id: data.id, password: data.password })
            .then((user) => {
                if (user) {
                    obj.isSucces = true
                    obj.userId = user._id
                    obj.firstName = user.firstName
                    obj.lastName = user.lastName
                    obj.adress = user.adress
                    obj.city = user.city
                    obj.package = user.package
                    resolve(obj);
                }
                resolve(obj);
            })
            .catch((err) => {
                reject({ err: "faild to login" })
            })
    })
    return p;
}

addToCart = (data) => {
    return new Promise((resolve, reject) => {
        let quantity = 0;
        clientTable.findOne({ _id: data.userId })
            .then(user => {
                let temp = user.cart.filter(x => {
                    return x.id == data.obj.id;
                })
                if (temp.length !== 0) {
                    quantity = temp[0].quantity;
                    clientTable.findOneAndUpdate({ _id: data.userId, cart: { $elemMatch: { id: data.obj.id } } },
                        {
                            $set: {
                                'cart.$.quantity': quantity + parseInt(data.obj.quantity)
                            }
                        }, // list fields you like to change
                        { 'new': true, 'safe': true, 'upsert': true })
                        .then((user) => {
                            user.save();
                            return resolve(user);
                        }).catch((err) => {
                            return reject('failed')
                        })
                }
                else {
                    user.cart.push(data.obj);
                    user.save();
                    return resolve(user);

                }
            }).catch((err) => {
                return reject('id was nort found')
            })
    })
}

getCustomerProducts = data => {
    return new Promise((resolve, reject) => {
        clientTable.findOne({ _id: data.userId })
            .then((userCart) => {
                return resolve(userCart)
            }).catch((err) => { return reject(err) })
    })
}

removefromcart = data => {
    return new Promise((resolve, reject) => {
        clientTable.findOne({ _id: data.userId })
            .then((user) => {
                for (let index = 0; index < user.cart.length; index++) {
                    if (user.cart[index].id === data.id) {
                        user.cart.splice(index, 1)
                        user.save()
                        return resolve(user)
                    }
                }

            }).catch((err) => { return reject(err) })
    })
}

removeAllFromCart = data => {


    return new Promise((resolve, reject) => {
        clientTable.findOne({ _id: data.userId })
            .then((user) => {
                if (user) {
                    user.cart.splice(0);
                    user.save()
                    return resolve(user)
                }


            }).catch((err) => { return reject(err) })
    })
}

buyFromCart = (productsArray, userid) => {
    return new Promise((resolve, reject) => {
        clientTable.findById({ _id: userid })
            .then((user) => {
                for (let index = 0; index < user.cart.length; index++) {
                    for (let productIndex = 0; productIndex < productsArray.length; productIndex++) {
                        if (user.cart[index].id === productsArray[productIndex].id) {

                            if (user.cart[index].quantity < productsArray[productIndex].updQuantity) {
                                productModel.buyfromcart(productsArray[productIndex].id, user.cart[index].quantity);
                                
                            }
                        }
                    }

                }
                let data={
                    userId:userid,
                    adress:user.adress,
                    city:user.city,
                    cart:user.cart
                }
                orderModel.addOrder(data).then((order) => {
                    if (order) {

                        user.cart.splice(0)
                        user.save();
                        return resolve(user);
                    }



                })
                    .catch((err) => {
                        return resolve(err)
                    })


            }).catch((err) => { return reject(err) })
    })
}

module.exports = {
    registerClient: registerClient,
    login: login,
    addToCart: addToCart,
    getCustomerProducts: getCustomerProducts,
    removefromcart: removefromcart,
    buyFromCart: buyFromCart,
    removeAllFromCart: removeAllFromCart
}
