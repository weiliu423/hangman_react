import React, { Component } from 'react';
import logo from './pics/1.png';
import './Style/App.css';
import { Redirect } from 'react-router-dom'
import fetch from 'node-fetch';
import './Style/loading.css'

let account;
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirect: false,
            type: "",
            show: false,
            result: ""
        };
    }
    componentWillMount() {
        setTimeout(() => {
            window.history.forward()
        }, 0);
        window.onunload= null;
    }
    onShow = ()=> {
        this.setState({ show: true })
    };
    onHide = ()=> {
        this.setState({ show: false })
    };
    componentDidMount() {
    }
    static account(){
        return account;
    }
    loading(){
        if(this.state.show){
            return <div className={"space"}>
                <div className = "bar" >
                 </div>
            </div>
        }else {

        }
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
        this.onShow();
        this.setState({ result: "Validating, Please Wait. Thank You" });;
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
                        if (json.Success === true) {
                            setTimeout(function() {
                                this.onHide();
                                this.setState({ result: "Success"});
                                account = username;
                                this.setState({
                                    redirect: true
                                });
                            }.bind(this), 2000);
                            return true
                        }
                        else {
                            setTimeout(function() {
                                this.onHide();
                                this.setState({ result: "Incorrect username or password!" })
                            }.bind(this), 2000);
                        }
                    });
                }

            });
        }else{
            fetch('https://mvchub.azurewebsites.net/createNewAccount', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                    response.json().then(json => {
                        if (json.Success === true) {
                            this.onHide();
                            account = username;
                            this.setState({
                                redirect: true
                            });
                            return true
                        }
                        else {
                            setTimeout(function() {
                                this.onHide();
                                this.setState({ result: "User already exist!" })
                            }.bind(this), 2000);
                        }
                    });
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
        if (this.state.redirect) {
            this.forceUpdate();
            return <Redirect to='/main' />;
        }
    };
    login = () => {
        return (

            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to HangMan game</h1>
                </header>
                <div className="App-intro">
                    <div id='title'>
                        <div className="login-form">
                            <label className={"labelClass"}>USERNAME</label>
                            <input
                                type="text"
                                name={"username"}
                                placeholder={"USERNAME"}
                                value={this.state.username}
                                onChange={e=>this.toDoUserChange(e.target.value)}
                            />
                            <label className={"labelClass"}>PASSWORD</label>
                            <input
                                name={"password"}
                                value={this.state.password}
                                type="password"
                                placeholder={"PASSWORD"}
                                onChange={e=>this.toDoPassChange(e.target.value)}
                            />
                            <div className="row">
                                <div className="column1">
                            <button className={"myButton spin circle"} onClick={this.loginType.bind(this)}
                                    disabled={!this.validateForm()}
                            >{this.renderRedirect()}
                                Sign In
                            </button>
                                </div>
                                <div className="column1">
                            <button className={"myButton spin circle"} onClick={this.signupType.bind(this)}
                                    disabled={!this.validateForm()}
                            >{this.renderRedirect()}
                                Sign Up
                            </button>
                                </div>
                        </div>
                        <label className={"error"}>{this.state.result}</label>
                        {this.loading()}
                    </div>
                    </div>
                </div>
            </div>
        )
    };
    render() {
        return (
            this.login()
        );
    }
}
