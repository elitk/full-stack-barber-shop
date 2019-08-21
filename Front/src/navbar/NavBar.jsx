import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from '../forms/Login/Login';
import Register from '../forms/Register/Register';
import './NavBar.css'
import Product from '../product/Product';
import About from '../about/About'
import Contact from '../contact/Contact';
import Cart from '../cart/Cart';
import clientModel from '../models/client';

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: 'guest'
    }

  }
  componentDidMount() {
    let token;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }
    clientModel.getClientDetails()
      .then((token) => {
        if (token) {
          this.setState({
            firstName: token.data.userDetails.firstName
          })
        }
      }).catch((err) => {
      })
  }
  logout = () => {
    localStorage.removeItem('token');
    this.setState({
      firstName: 'guest'
    })
  }
  render() {
    let cart = '';
    let loginOrLogOut = ''
    if (localStorage.getItem('token')) {
      cart = (<li className="nav-item">
        <Link onClick={this.closeNav} className="nav-link" to="/cart">
          cart
      </Link>

      </li>)
      loginOrLogOut = (<li className="nav-item">
        <Link className="nav-link" to="/" onClick={this.logout}>
          Log Out
    </Link>
      </li>)
    }
    else {


      loginOrLogOut = (<li className="nav-item">
        <Link className="nav-link" to="/login" >
          Login
      </Link>
      </li>)
    }

    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="icon" to="/">
            BarberShop
        </Link>

          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="navbar-collapse collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link onClick={this.closeNav} className="nav-link home" to="/">
                  Home
              </Link>
              </li>
              <li className="nav-item">
                <Link onClick={this.closeNav} className="nav-link" to="/about">
                  about
              </Link>
              </li>
              <li className="nav-item">
                <Link onClick={this.closeNav} className="nav-link" to="/contact">
                  contact
              </Link>
              </li>
              <li className="nav-item">
                <Link onClick={this.closeNav} className="nav-link" to="/product">
                  product
              </Link>
              </li>
              {cart}
              <li className="nav-item">
                <Link onClick={this.closeNav} className="nav-link" to="/Register">
                  Register
              </Link>
              </li>
              {loginOrLogOut}
              <li className='username'> <div className="user">hello {this.state.firstName}</div></li>
            </ul>
          </div>
        </nav>

        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/product" component={Product} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/cart" component={Cart} />
      </Router>
    );
  }

}

export default NavBar;