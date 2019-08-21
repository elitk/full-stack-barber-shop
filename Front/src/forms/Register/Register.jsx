import React, { Component } from 'react';
import './Register.css'
import Axios from 'axios';
import clientModel from '../../models/client';
import validate from '../validate'
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            idValid: false,
            firstName: '',
            firstNameValid: false,
            lastName: '',
            lastNameValid: false,
            adress: '',
            adressValid: false,
            city: '',
            cityValid: false,
            password: '',
            passwordValid: false,
            error: ''
        }

    }

    changeVal = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        if (validate.validate(event.target.value, event.target.name)) {

            switch (event.target.name) {
                case "id":
                        this.setState({
                            error: '',
                            idValid: true
                        });
                    break;
                case "firstName":
                        this.setState({
                            firstNameValid: true
                        });
                    break;
                case "lastName":
                        this.setState({
                            lastNameValid: true
                        });
                    break;
                case "password":
                        this.setState({
                            passwordValid: true
                        });
                    break;
                case "city":
                        this.setState({
                            cityValid: true
                        });
                    break;
                case "adress":
                        this.setState({
                            adressValid: true
                        });
                    break;
                default:
                    break;
            }
        } 
        else {
           
            switch (event.target.name) {
                case "id":
                        this.setState({
                            idValid: false
                        });
                    break;
                case "firstName":
                        this.setState({
                            firstNameValid: false
                        });
                    break;
                case "lastName":
                        this.setState({
                            lastNameValid: false
                        });
                    break;
                case "password":
                        this.setState({
                            passwordValid: false
                        });
                    break;
                case "city":
                        this.setState({
                            cityValid: false
                        });
                    break;
                case "adress":
                        this.setState({
                            adressValid: false
                        });
                    break;
                default:
                    break;
            }
        }
    };
    register = (e) => {
        e.preventDefault()
        let obj = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            adress: this.state.adress,
            city: this.state.city,
            password: this.state.password,
        }
        clientModel.register(obj)
            .then((result) => {
                if (result) {
                    this.props.history.push("/");
                }
            })
            .catch((err) => {
                this.setState({
                    error: "Error This Id In Use",
                    id: '',
                    idValid: false,
                });
            })
    }
    render() {
        return (
            <div className="myform">
                <form className='registerBox' method='post' onSubmit={this.register}>

                    <h1>REGISTER</h1>
                    <div>
                        <input type="text" name="id" placeholder=' id' onChange={event => this.changeVal(event)}
                            value={this.state.id}
                            required maxLength='9'
                        />
                        {!this.state.idValid && this.state.id.length > 0 && (
                            <label className="alertLogin">id must contain 9 digits</label>
                        )}
                    </div>
                    <input type="text" name="firstName" placeholder='firstName' onChange={event => this.changeVal(event)}
                        value={this.state.firstName}
                        required />
                    {!this.state.firstNameValid &&
                        this.state.firstName.length > 0 && (
                            <label className="alertLogin">
                                english letters must and min 2 characters
                            </label>
                        )}
                    <input type="text" name="lastName" placeholder='lastName' onChange={event => this.changeVal(event)}
                        value={this.state.lastName}
                        required />
                    {!this.state.lastNameValid &&
                        this.state.lastName.length > 0 && (
                            <label className="alertLogin">
                                english letters must and min 2 letters
                  </label>
                        )}
                    <input type="text" name="adress" placeholder='adress' onChange={event => this.changeVal(event)}
                        value={this.state.adress}
                        required />
                    {!this.state.adressValid && this.state.adress.length > 0 && (
                        <label className="alertLogin">
                            min 2 letters
                </label>
                    )}
                    <input type="text" name="city" placeholder='city' onChange={event => this.changeVal(event)} value={this.state.password}
                        value={this.state.city}
                        required />
                    {!this.state.cityValid && this.state.city.length > 0 && (
                        <label className="alertLogin">
                            min 2 letters
                </label>
                    )}
                    <input type="password" name="password" placeholder='password' onChange={event => this.changeVal(event)}
                        value={this.state.password}
                        required />
                    {!this.state.passwordValid && this.state.password.length > 0 && (
                        <label className="alertLogin">
                            min 6 Characters
                </label>
                    )}
                    <input type="submit" name="register" value='register' />
                    <div className="error">{this.state.error}</div>
                </form>

            </div>
        );
    }
}

export default Register;