import React, { Component } from 'react';
import logo from './1.png';
import './App.css';
import { FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import { Redirect } from 'react-router-dom'

const row1 = ['A','B','C','D','E','F','G','H','I'];
const row2 = ['J','K','L','M','N','O','P','Q'];
const row3 = ['R','S','T','U','V','W','X','Y','Z'];
var words = [];
var answer = [];
var categories = '';

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
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>username</ControlLabel>
                        <FormControl
                            autoFocus
                            type="string"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <button class="btn peach-gradient btn-rounded"
                        disabled={!this.validateForm()}
                        type="submit"
                     >{this.renderRedirect()}
                        Login
                    </button>
                </form>
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
        if(this.state.username === "a" && this.state.password === "a" )
        {
            this.setState({
                redirect: true
            });
            return true
        }else
        {
            alert("Incorrect");
        }
       //<Redirect to='/main' />;
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
export class main extends Component {
    constructor(props) {
        super(props);
        {this.addWord()}
        this.state = {
            disabled: false,
            disableButtons : [],
            change: false,
            wordArray : []
        };

    }
   showCategory(){

        return <div class="CategoryText">Category is {categories}</div>
   }
   addWord()
   {
       let cateG = [];
       var maxCat = 3;
       var ranCate = Math.floor((Math.random() * maxCat));
       var Sport = require('./data/Sport.json');
       var Food = require('./data/Food.json');
       var Countries = require('./data/Countries.json');
       cateG.push(Sport);
       cateG.push(Food);
       cateG.push(Countries);
       let Cate = cateG[ranCate].Category;
       categories = Cate;
       console.log(categories);
       let word;
       var maxNumber = 3;
       var randomNumber = Math.floor((Math.random() * maxNumber));

       var data = require('./data/'+categories+'.json');
       word = data.Answers[randomNumber].Word;

       for(let i = 0; i < word.length; i++)
       {
           words.push('_');
           answer.push(word.charAt(i));
       }

   }
   createLabel(letter){
       return (
           <button className="square">{letter}</button>
       );
   }
   containerWords(){
       let children = [];
       children.push(words.map((row1, i) => {return this.createLabel(row1)}));
       return children
   }
   clicked(letter) {
        let disableButtons = this.state.disableButtons;
        disableButtons.push(letter);
        this.setState({disableButtons});
        let array;
        array = words;
        let wordArray = this.state.wordArray;
       console.log("array of answer " + answer);
       for(var x = 0; x < array.length; x++ )
       {
           if(answer[x].includes(letter)) {
               console.log("same " + letter);
               words[x] = letter;
               wordArray.push(letter);
               /*}
               else if (words[x].includes(letter) && wordArray[x] !== ' ')
               {
                   console.log("not same " + letter);
                  wordArray.push(' ');
               }else
               {
                   console.log("else " + letter);
                  wordArray.push(' ');
               }*/
           }
       }
       if(JSON.stringify(answer) === JSON.stringify(words))
       {

       }
      // array = [];
       //this.setState({wordArray});
      // array.map((numbers, i) => {return main.updateLabel(i,letter)});
        this.setState({change : true});
    }
    newGame(){
        if(JSON.stringify(answer) === JSON.stringify(words))
        {
            return(
                <div>
                    <button class=""></button>
                </div>
            )
            /*words = [];
            {this.addWord()}*/
            //this.setState({change : true});
        }else
        {
            return(
                <div className="buttonClass">
                    {this.createButton()}
                    {this.showCategory()}
                    {this.containerWords()}
                </div>
            )
        }
    }
    startNewGame()
    {

    }
    dynamicButton(letter) {
        let disable =  this.state.disableButtons.includes(letter);
        return (
            <button class={"button1 zoom"} onClick={this.clicked.bind(this, letter)} disabled={disable} key={letter}>{letter}</button>
        );
    }
    createButton = () => {
        let table = [];
        let rows = [];
        let children = [], children1= [], children2= [];

        children.push(row1.map((row1, i) => {return this.dynamicButton(row1)}));
        rows.push(<tr>{children}</tr>);
        children1.push(row2.map(row2 => {return this.dynamicButton(row2)}));
        rows.push(<tr>{children1}</tr>);
        children2.push(row3.map((row3, i) => {return this.dynamicButton(row3)}));
        rows.push(<tr>{children2}</tr>);
        //children.push(data.map((data) => <Button bsStyle="warning" bsSize="large" >{data}</Button>));
        table.push(<table class="tableClass">{rows}</table>);
        return table
    };
    main = () => {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to HangMan game</h1>
                </header>
                <p className="App-intro">
                    {this.newGame()}
                </p>
            </div>
        )

    };
    render() {
        return (
            this.main()
        );
    }

}
