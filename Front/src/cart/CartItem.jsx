import React, { Component } from 'react';
import clientModel from '../models/client';

class CartItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            productName: this.props.productName,
            productPrice: this.props.productPrice,
            quantity: this.props.quantity,
            total: this.props.total,
        }
    }

    removeFromCart = e => {
        let token = JSON.parse(localStorage.getItem('token'));
        let userId;
        clientModel.getClientDetailsByToken(token)
            .then((user) => {
                userId = user.data.userDetails.userId;
                this.props.children({ userId: userId, id: this.state.id })
            })
    }
    render() {
        return (
            <tr>
                <th scope="row">{this.state.id}</th>
                <td>{this.state.productName}</td>
                <td>{this.state.productPrice}</td>
                <td>{this.state.quantity}</td>
                <td>{this.state.total}</td>
                <td><button type="button" className='removeBtn' onClick={this.removeFromCart}>Remove!</button></td>
            </tr>
        );
    }
}

export default CartItem;