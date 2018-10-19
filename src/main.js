import React, { Component } from 'react';
import logo from './pics/1.png';
import './Style/App.css';

import $ from "jquery";

const row1 = ['A','B','C','D','E','F','G','H','I'];
const row2 = ['J','K','L','M','N','O','P','Q'];
const row3 = ['R','S','T','U','V','W','X','Y','Z'];
var words = [];
var answer = [];
var categories = '';
var Sport = require('./data/Sport.json');
var Food = require('./data/Food.json');
var Countries = require('./data/Countries.json');


export class main extends Component {
    constructor(props) {
        super(props);
        {this.addWord()}
        this.state = {
            disabled: false,
            disableButtons : [],
            change: false,
            wordArray : [],
            img : []
        };

    }
    componentDidMount() {

        $(document).ready(function () {

        });
    }

    showCategory(){

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
            <button className="square" disabled={true}>{letter}</button>
        );
    }
    containerWords(){
        let children = [];
        children.push(words.map((row, i) => {return this.createLabel(row)}));
        return children
    }
    clicked(letter) {
        let wordArray = this.state.wordArray;
        console.log("length: " + wordArray.length);
        if(wordArray.length === 10)
        {
            {this.NewGame()}
            wordArray = [];
            this.setState({wordArray});

        }else {
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
                    words[x] = letter;
                }
            }
            if(!answer.includes(letter)) {
                wordArray.push(letter);
            }
            // array = [];
            this.setState({wordArray});
            // array.map((numbers, i) => {return main.updateLabel(i,letter)});
            this.setState({change : true});
        }

    }
    newGame(){
        let wordArray = this.state.wordArray;
        if(JSON.stringify(answer) === JSON.stringify(words))
        {
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
                    <button className="playButton" onClick={this.startNewGame.bind(this)}>PLAY AGAIN?</button>
                </div>
            )
            /*words = [];
            {this.addWord()}*/
        }else if(wordArray.length === 10)
        {
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
                    <button className="playButton" onClick={this.startNewGame.bind(this)}>PLAY AGAIN?</button>
                </div>
            )
        }
        else
        {
            return(
                <div className="buttonClass">
                    {this.createButton()}
                    {this.showCategory()}
                    {this.containerWords()}
                    <div className={"hangManPic"}>
                        {this.loadHangMan()}
                    </div>
                </div>
            )
        }
    }
    startNewGame()
    {
        {this.componentDidMount()};
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
                {this.createButton()}
                {this.showCategory()}
                {this.containerWords()}
                <div className={"hangManPic"}>
                    {this.loadHangMan()}
                </div>
            </div>
        )
    }
    loadHangMan(){
        console.log('length :  ' + this.state.wordArray.length);
        var images = require('./pics/hangman-'+this.state.wordArray.length+'.png');
        console.log(images);
        return(    <img src={images} alt="Smiley face" width={"200px"} height={"200px"} />)
    }
    dynamicButton(letter) {
        let disable =  this.state.disableButtons.includes(letter);
        return (
            <button className={"button1 zoom"} onClick={this.clicked.bind(this, letter)} disabled={disable} key={letter}>{letter}</button>
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
        table.push(<table className="tableClass">{rows}</table>);
        return table

    };
    main = () => {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to HangMan game</h1>
                </header>
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
            this.main()
        );
    }

}
