import React, { Component } from 'react';
import './Login.css'
import validate from "../validate";
import clientModel from '../../models/client';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            password: '',
            idValid: false,
            passwordValid: false,
            error: ''
        }
    }
    changeVal = event => {
        this.setState({ [event.target.name]: event.target.value,error:'' });
        if (validate.validate(event.target.value, event.target.name)) {
            if (event.target.name === "password") {
                if (event.target.value.length >= 6) {
                    this.setState({
                        passwordValid: true,
                        error: ''
                    });
                } else {
                    this.setState({
                        passwordValid: false
                    });
                }
            }
            if (event.target.name === "id") {
                if (event.target.value.length === 9) {
                    this.setState({
                        idValid: true,
                        error: ''
                    });
                }
                else {
                    this.setState({
                        idValid: false
                    });
                }
            }
        }

    };

    login = (e) => {
        e.preventDefault()
        clientModel.login(this.state.id, this.state.password)
            .then((result) => {
                    localStorage.setItem('token', JSON.stringify(result.data.token));
                    window.location = "/";
            })
            .catch((err) => {
                this.setState({
                    error: "Error Wrong ID Or Password",
                    id: '',
                    password: '',
                    idValid: false,
                    passwordValid: false,
                });
            })
    };
    render() {
        return (
            <div className="myform">
                <form className='box' method='post' onSubmit={this.login}>
                    <h1>Login</h1>
                    <div className="panel panel-default">
                    </div>
                    <div >
                        <input type="text" name="id" placeholder='id' onChange={event => this.changeVal(event)}
                            value={this.state.id}
                            required />
                        {!this.state.idValid && this.state.id.length > 0 && (
                            <label className="alertLogin">id must contain 9 digits</label>
                        )}
                    </div >

                    <div >
                        <input type="password" name="password" placeholder='password' onChange={event => this.changeVal(event)}
                            value={this.state.password}
                            required />
                        {!this.state.passwordValid && this.state.password.length > 0 && (
                            <label className="alertLogin">
                                password must be min 6
                         </label>
                        )}

                    </div>
                    <input type="submit" value='login' />
                    <div className="error">{this.state.error}</div>

                </form>

            </div>
        );
    }
}

export default Login;