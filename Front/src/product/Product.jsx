import React, { Component } from 'react';
import './Product.css'
import ProductItem from './ProductItem';
import clientModel from '../models/client';

class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        clientModel.getProducts()
          .then((result) => {
            this.setState({
                products:result.data.success
            })
          })
      }
      
    shouldComponentUpdate(prevProps, prevState) {
        if (this.state.products.length !== prevState.products.length) {
            return true;
        }
        return false;
    }

    render() {
        const { products } = this.state;
        let result = products.map((x,index) => {
            return <ProductItem key={index}children={this.data} id={x.id} productName={x.productName} 
            productPrice={x.productPrice} updQuantity={x.updQuantity} />

        })
        return (
            <div className="container-fluid">
                <div className='row'>
                    {result}
                </div>
            </div>
        );
    }
}

export default Product;

