import React, {Component} from 'react';
import './Style/App.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import App from "./App";
import fetch from "node-fetch";

const row1 = ['A','B','C','D','E','F','G','H','I'];
const row2 = ['J','K','L','M','N','O','P','Q'];
const row3 = ['R','S','T','U','V','W','X','Y','Z'];
var words = [];
var answer = [];
var countGame = [0,0,0];
var categories = '';
var Sport = require('./data/Sport.json');
var Food = require('./data/Food.json');
var Countries = require('./data/Countries.json');
const uuidv4 = require('uuid/v4');
let username;

export class main extends Component {
    constructor(props) {
        super(props);
        {this.addWord()}
        this.state = {
            disabled: false,
            disableButtons : [],
            change: false,
            wordArray : [],
            img : [],
            login: true,
            bubble1: "",
            result : "",
            bubble2: <div className="speech-bubble">
                <button onClick={this.hideBubble.bind(this)} key={uuidv4()} className="close"/>
                <div className="arrow bottom right"/>
                Rules:
                <br />
                1.Start guessing letters.
                <br />
                2.Fill the letter in the box if player guess correctly.
                <br />
                3.Draw part of the "hangman" when the players guess wrong.
                <br />
                4. The players win when they guess the correct word
                <br />
            </div>
        };

        username = App.account();
        this.checkForScore = this.checkForScore.bind(this);
    }
    componentWillMount() {
        setTimeout(() => {
            window.history.forward()
        }, 0);
        window.onunload= null;
    }
    componentDidMount(){
        {this.checkForScore()}
    }
    checkForScore(){
            fetch('https://mvchub.azurewebsites.net/getScore?userId='+username, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        let data = json.Data.split(":");
                        for(let i = 0; i < countGame.length; i++)
                        {
                            countGame[i] = data[i];
                        }
                        this.setState({ result: "Success"});
                        return true;
                    });
                }
            });
    }
    showBubble(){
        this.setState({ bubble1: <div className="speech-bubble1">
                <button onClick={this.hideBubble1.bind(this)} key={uuidv4()} className="close"/>
                <div className="arrow bottom1 right"/>
                Click any letter button to start the game!
            </div> })
    }
    "use strict";
    hideBubble(){
        this.setState({ bubble2: "" });
        this.showBubble();
    }
    hideBubble1(){
        this.setState({ bubble1: "" });

    }
    static showCategory(){

        return <div className="CategoryText">Category is {categories}</div>
    }
    addWord()
    {
        let cateG = [];
        var maxCat = 3;
        var ranCate = Math.floor((Math.random() * maxCat));

        cateG.push(Sport);
        cateG.push(Food);
        cateG.push(Countries);
        categories = cateG[ranCate].Category;;
        let word;
        const maxNumber = 3;
        const randomNumber = Math.floor((Math.random() * maxNumber));

        const data = require('./data/'+categories+'.json');
        word = data.Answers[randomNumber].Word;
        for(let i = 0; i < word.length; i++)
        {
            words.push('_');
            answer.push(word.charAt(i));
        }

    }
    static createLabel(letter){
        return (
            <button className="square" key={uuidv4()} disabled={true}>{letter}</button>
        );
    }
    containerWords(){
        let children = [];
        children.push(words.map((row, i) => {return main.createLabel(row)}));
        return children
    }
    clicked(letter) {
        let wordArray = this.state.wordArray;
        if(wordArray.length === 9)
        {
            {this.newGame()}
            wordArray = [];
            this.setState({wordArray});

        }else {
            let disableButtons = this.state.disableButtons;
            disableButtons.push(letter);
            this.setState({disableButtons});
            let array;
            array = words;
            let wordArray = this.state.wordArray;
            for(let x = 0; x < array.length; x++ )
            {
                if(answer[x].includes(letter)) {
                    words[x] = letter;
                }
            }
            if(!answer.includes(letter)) {
                wordArray.push(letter);
            }
            this.setState({wordArray});
        }

    }
    newGame(){
        let wordArray = this.state.wordArray;
        if(JSON.stringify(answer) === JSON.stringify(words))
        {
            countGame[1]++;
            let str = answer;
            words = [];
            answer = [];
            let str1 = str.toString();
            for(let i=0; i <str1.length; i++)
            {
                str1 = str1.replace(',', '');
            }
            return(
                <div>
                    <div className="errorMessage">Congratulation: You got correct answer - {str1}</div>
                    <button className="playButton" key={uuidv4()} onClick={this.startNewGame.bind(this)}>PLAY AGAIN?</button>
                </div>
            )
        }else if(wordArray.length === 9)
        {
            countGame[2]++;
            let str = answer;
            words = [];
            answer = [];
            let str1 = str.toString();
            for(let i=0; i <str1.length; i++)
            {
                str1 = str1.replace(',', '');
            }
            return(
                <div>
                    <div className="errorMessage">Out of Attempt: The correct answer is {str1}</div>
                    <button className="playButton" key={uuidv4()} onClick={this.startNewGame.bind(this)}>PLAY AGAIN?</button>
                </div>
            )
        }
        else{

            return(

                <div>
                    <div className="row">
                        <div className="column">
                            {this.state.bubble2}
                        </div>
                        <div className="column">
                            <div className={"hangManPic"}>
                                {this.loadHangMan()}
                            </div>
                        </div>
                        <div className="column">
                            <p>Game Played: {countGame[0]}</p>
                            <p>Won: {countGame[1]}</p>
                            <p>Lost: {countGame[2]}</p>
                            <Link class={"logout"} to={"/"} onClick={this.changeState}>Sign Out</Link>
                            {this.state.bubble1}
                        </div>
                    </div>
                    <div className="buttonClass">
                    {this.createButton()}
                    {main.showCategory()}
                    {this.containerWords()}
                    </div>
                </div>
            )
        }
    }

    changeState(){
        var data = {
            "userId": username,
            "played": countGame[0],
            "won": countGame[1],
            "lost": countGame[2]
        };
        fetch('https://mvchub.azurewebsites.net/updateScore/', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    return json.Success;
                });
            }

        });
         this.setState({result : "SignOut"});
    }
    startNewGame()
    {
        countGame[0]++;
        words = [];
        answer = [];
        {this.addWord()}
        let wordArray = this.state.wordArray;
        wordArray = [];
        this.setState({wordArray});
        let disableButtons = this.state.disableButtons;
        disableButtons = [];
        this.setState({disableButtons});
        return(
            <div className="buttonClass">
                <div className={"hangManPic"}>
                    {this.loadHangMan()}
                </div>
                {this.createButton()}
                {main.showCategory()}
                {this.containerWords()}

            </div>
        )
    }
    loadHangMan(){
        var images = require('./pics/hangman-'+this.state.wordArray.length+'.png');
        return(    <img className={"img"} src={images} alt="Smiley face" />)
    }
    dynamicButton(letter) {
        let disable =  this.state.disableButtons.includes(letter);
        return (
            <button className={"button1 zoom"} onClick={this.clicked.bind(this, letter)} disabled={disable} key={uuidv4()}>
                {letter}</button>
        );
    }
    createButton = () => {
        let table = [];
        let rows = [];
        let children = [], children1= [], children2= [];

        children.push(row1.map((row1, i) => {return this.dynamicButton(row1)}));
        rows.push(<tr><td>{children}</td></tr>);
        children1.push(row2.map(row2 => {return this.dynamicButton(row2)}));
        rows.push(<tr><td>{children1}</td></tr>);
        children2.push(row3.map((row3, i) => {return this.dynamicButton(row3)}));
        rows.push(<tr><td>{children2}</td></tr>);
        table.push(<table className="tableClass"><tbody>{rows}</tbody></table>);
        return table

    };
    main = () => {
        return (
            <div className="App">
                <div id='title'>
                <div className="App-intro">
                    {this.newGame()}
                </div>
                </div>

            </div>
        )

    };
    render() {
        return (
            <Router>
                <div>
            <Route exact path="/" component={App}/>
                <Route exact path="/main" render={
                    () => {
                        return (this.main());}
                }/>
                </div>
            </Router>
        );
    }

}
