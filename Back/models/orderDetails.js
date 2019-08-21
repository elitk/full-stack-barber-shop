const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({

    userId: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    orderAddres: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    orderCity: {
        type: String,
        min: 2,
        max: 25,
        required: true
    },
    orderProducts: {
        type: [],
        default: []
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

const orderTable = mongoose.model('orderDetails', orderSchema);

addOrder = (data) => {
    return new Promise((resolve, reject) => {
        let orderObj = orderTable({
            userId: data.userId,
            orderAddres: data.adress,
            orderCity: data.city,
            orderProducts: data.cart
        });
        orderObj.save()
        return resolve(orderObj)
    })
}

module.exports = {
    addOrder: addOrder
}
