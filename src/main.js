import React, {Component} from 'react';
import logo from './pics/1.png';
import './Style/App.css';

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
            bubble1: "",
            bubble2: <div className="speech-bubble">
                <button onClick={this.hideBubble.bind(this)} key={uuidv4()} className="close"/>
                <div className="arrow bottom right"/>
                Rules:
                <br />
                1.Start guessing letters if you are the player.
                <br />
                2.Fill the letter in the blanks if the players guess correctly.
                <br />
                3.Draw part of the "hangman" when the players guess wrong.
                <br />
                4. The players win when they guess the correct word
                <br />
            </div>
        };

    }

    showBubble(){
        this.setState({ bubble1: <div className="speech-bubble1">
                <button onClick={this.hideBubble1.bind(this)} key={uuidv4()} className="close"/>
                <div className="arrow bottom1 right"/>
                Click any letter button to start the game!
            </div> })
    }
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
        categories = cateG[ranCate].Category;
        console.log(categories);
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
        console.log("length: " + wordArray.length);
        if(wordArray.length === 10)
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
            console.log("array of answer " + answer);
            for(let x = 0; x < array.length; x++ )
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
            // array.map((numbers, i) => {return homePage.updateLabel(i,letter)});
            this.setState({change : true});
        }

    }
    newGame(){

        let wordArray = this.state.wordArray;
        if(JSON.stringify(answer) === JSON.stringify(words))
        {
            countGame[1] = countGame[1] + 1;
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
            /*words = [];
            {this.addWord()}*/
        }else if(wordArray.length === 10)
        {
            countGame[2] = countGame[2] + 1;
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
    startNewGame()
    {
        countGame[0] = countGame[0] + 1;
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
        console.log('length :  ' + this.state.wordArray.length);
        var images = require('./pics/hangman-'+this.state.wordArray.length+'.png');
        console.log(images);
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
        //children.push(data.map((data) => <Button bsStyle="warning" bsSize="large" >{data}</Button>));
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
            this.main()
        );
    }

}
