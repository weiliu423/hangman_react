import React, { Component } from 'react';
import logo from './pics/1.png';
import './Style/App.css';
import './Style/Buttons.css'
import { FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import { Redirect } from 'react-router-dom'
var loginDetails = require('./data/loginData.json');


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            redirect: false

        };
    }

    login = () => {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to HangMan game</h1>
                </header>
                <p className="App-intro">
                    <div id='title'>
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="small">
                  <ControlLabel>UserName</ControlLabel>
                        <FormControl
                            autoFocus
                            type="string"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="small">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <button className="loginButton"
                        disabled={!this.validateForm()}
                        type="submit"
                     >{this.renderRedirect()}
                        Login
                    </button>
                    <button className="loginButton"
                            disabled={!this.validateForm()}
                            type="submit"
                    >{this.renderRedirect()}
                        Sign Up
                    </button>
                </form>
            </div>
                    </div>
                </p>
            </div>


        )

    };

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.username + ' - ' + this.state.password);
        for(let x = 0; x < loginDetails.details.length; x++)
        {
            console.log(loginDetails.details[x].username + ' - ' + loginDetails.details[x].password);
            if(loginDetails.details[x].username === this.state.username
                && loginDetails.details[x].password === this.state.password)
            {
                this.setState({
                    redirect: true
                });
                return true
            }else if(loginDetails.details[x].username.includes(this.state.username)
                && loginDetails.details[x].password !== (this.state.password))
            {
                alert("Incorrect password!! Please try again.");
            }
            else{
                alert("Incorrect username or password!! Please try again.");
            }
        }

    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/main' />;
        }
    };
    render() {
        return (
            this.login()
        );
    }
}
