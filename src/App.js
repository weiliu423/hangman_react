import React, { Component } from 'react';
import logo from './pics/1.png';
import './Style/App.css';
import { Redirect } from 'react-router-dom'
import fetch from 'node-fetch';


const jsonfile = require('jsonfile');
var loginDetails = require('./data/loginData.json');

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            redirect: false,
            type: ""

        };
    }
    componentDidMount() {
     /*   $("button").click(function(){
            $(this).css('color','yellow');
            $(this).css('background-color','blue');
        });*/
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
                    <label>UserName</label>
                        <input
                            type="text"
                            name={"username"}
                            placeholder={"username"}
                            value={this.state.username}
                            onChange={e=>this.toDoUserChange(e.target.value)}
                        />
                        <label>Password</label>
                        <input
                            name={"password"}
                            value={this.state.password}
                            type="password"
                            onChange={e=>this.toDoPassChange(e.target.value)}
                        />
                    <button onClick={this.loginType.bind(this)}
                        disabled={!this.validateForm()}
                     >{this.renderRedirect()}
                        Login
                    </button>
                    <button onClick={this.signupType.bind(this)}
                            disabled={!this.validateForm()}
                    >{this.renderRedirect()}
                        Sign Up
                    </button>
            </div></div>
                </p>
            </div>
        )

    };
    test(){

     fetch('https://mvchub.azurewebsites.net/getallusers/',
         {
             method: 'GET',
             headers: {
                 Accept: 'application/json',
             },
         },)
         .then(response => {
             if (response.ok) {
                 response.json().then(json => {
                     //var object = JSON.parse(json);
                     console.log(json);
                 });
             }
             console.log(response.status);
         });
 }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }
    toDoUserChange(value){
        this.setState({username : value});
    }
    toDoPassChange(value){
        this.setState({password : value});
    }
    handleSubmit(username, password, type) {
        console.log("in handle");
        var data = {
            "Username": username,
            "Password": password
        };
        if(type === "signin") {
            fetch('https://mvchub.azurewebsites.net/signin/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        console.log("****************" + json.Success);
                        if (json.Success === true) {
                            this.setState({
                                redirect: true
                            });
                            return true
                        }
                        else {
                            alert("Incorrect username or password!! Please try again.");
                        }
                        console.log(json);
                    });
                }

            });
        }else{
            fetch('https://mvchub.azurewebsites.net/createNewAccount/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        console.log("****************" + json.Success);
                        if (json.Success === true) {
                            this.setState({
                                redirect: true
                            });
                            return true
                        }
                        else {
                            alert("User already exists");
                        }
                        console.log(json);
                    });
                }

            });
        }
    };
    loginType = () => {
        this.handleSubmit(this.state.username, this.state.password, "signin");
    };
    signupType = () => {
        this.handleSubmit(this.state.username, this.state.password, "signup");
    };
    renderRedirect = () => {
        console.log(this.state.redirect.toString());
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
