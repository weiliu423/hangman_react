import React, { Component } from 'react';
import logo from './1.png';
import './Style/App.css';
import {Button, ButtonGroup} from "react-bootstrap";

const data = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

export default class main extends Component {
    createbutton = () => {
        let buttons = [];
        let children = [];
        children.push(data.map((data)=> <Button>{data}</Button>));
        buttons.push(<ButtonGroup>{children}</ButtonGroup>);
        return buttons
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    {this.createbutton()}
                </p>
            </div>
        );
    }
}
