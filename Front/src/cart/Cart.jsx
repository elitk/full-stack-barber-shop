import React, { Component } from 'react';
import CartItem from './CartItem';
import './Cart.css'
import clientModel from '../models/client';

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            total: 0,
            totalPrice: 0
        }
    }

    componentDidMount() {
        let token = JSON.parse(localStorage.getItem('token'));
        let userId;
        clientModel.getClientDetailsByToken( token )
            .then((user) => {
                userId = user.data.userDetails.userId;
                clientModel.getClientProducts(userId)
                    .then((userCart) => {
                        this.setState({ products: userCart.data.cart })
                    }).catch((err) => {
                    })
            })
    }

    removeFromCart = data => {
        clientModel.remooveFromCart(data.userId,data.id)
            .then((user) => {
                this.setState({ products: user.data.cart })

            })
            .catch((err) => {  })
    }
    buyFromCart = e => {
        if (window.confirm("are you sure you want to buy?")) {
            let token = JSON.parse(localStorage.getItem('token'));
            let userId;
            clientModel.getClientDetailsByToken(token)
                .then((user) => {
                    userId = user.data.userDetails.userId;
                    clientModel.buyFromCart(userId)
                        .then((user) => {
                            this.setState({ products: user.data.cart })
                        })
                })
        }
    }

    render() {
        let result = this.state.products.map((x, index) => {
            return <CartItem key={index} children={this.removeFromCart} id={x.id} productName={x.productName}
             productPrice={x.productPrice} quantity={x.quantity} total={parseInt(x.quantity) * parseInt(x.productPrice)} />
        })
        return (
            <div className='table-responsive'>
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">product name</th>
                            <th scope="col">product price</th>
                            <th scope="col">quantity</th>
                            <th scope="col">total</th>
                            <th scope="col">remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result}
                    </tbody>
                </table>
                <input type="submit" onClick={this.buyFromCart} className='contact-form-btn' value="buy now!" />
            </div>
        );
    }
}

export default Cart;