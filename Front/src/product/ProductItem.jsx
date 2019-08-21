import React, { Component } from 'react';
import image from '../img/img2.png';
import './Product.css'
import clientModel from '../models/client';

class ProductItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            productName: this.props.productName,
            productPrice: this.props.productPrice,
            updQuantity: this.props.updQuantity,
            quantity: 1
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addProduct = (e) => {
        let token;
        if (!localStorage.getItem('token')) {
            alert("you need to log in")
        }
        else {
            token = JSON.parse(localStorage.getItem('token'));
            let userId;
            clientModel.getClientDetailsByToken(token)
                .then((user) => {
                    userId = user.data.userDetails.userId;
                }).finally(() => {
                    let obj = {
                        id: this.state.id,
                        productName: this.state.productName,
                        productPrice: this.state.productPrice,
                        quantity: this.state.quantity
                    }
                    clientModel.addToCart(userId, obj)
                        .then((result) => {
                            alert("add to cart !")
                        })
                        .catch((err) => {
                        })
                })
        }
    }

    render() {
        return (
            <div className="col-sm-4">
                <div className='prod-card'>
                    <div className='img'>
                        <img src={image} alt="" />
                    </div>
                    <div><img src="../img/gel.jpg" alt="" /></div>
                    <div className='prod-info' >
                        <span className='desc'> {this.state.productName}</span>
                        <span className='price'> {this.state.productPrice} <i className='ion-social-usd'></i></span>
                        <span> <input type="number" value={this.state.quantity} name="quantity"
                            onChange={this.handleInputChange} className="float"
                        /></span>
                        <button className='addbtn' onClick={this.addProduct}>Add to cart <i className='ion-android-cart' ></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductItem;