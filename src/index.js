import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'node-fetch';
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

/** eslint-disable no-console **/
class Trivia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            wrongAnswers: [],
            correctAnswer: [],
            score: 0,
            rounds: 1
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        if (this.props.newGame == 1) {
            this.setState({score: 0, rounds: 1})
        }
    }
    componentDidMount() {
        fetch("https://opentdb.com/api.php?amount=1&type=multiple")
        .then((res) => {
            return res.json();
        })
        .then((resJson) => {
            this.setState({question: resJson.results[0].question, correctAnswer: resJson.results[0].correct_answer, wrongAnswers: resJson.results[0].incorrect_answers});
        })
        .catch((error) => {
            console.log(error);
        });
    }
    handleClick(answer) {
        if (answer == this.state.correctAnswer) {
            this.setState((prevState) =>  ({
                score: prevState.score + 1
            }));
        }

        if (this.state.rounds != 10) {
            this.setState((prevState) => ({
                rounds: prevState.rounds + 1
            }));
            fetch("https://opentdb.com/api.php?amount=1&type=multiple")
            .then((res) => {
                return res.json();
            })
            .then((resJson) => {
                this.setState({question: resJson.results[0].question, correctAnswer: resJson.results[0].correct_answer, wrongAnswers: resJson.results[0].incorrect_answers});
            })
            .catch((error) => {
                console.log(error);
            });

            ReactDOM.render(
                <Trivia/>,
                document.getElementById("triviaBox")
            );
        } else {
            ReactDOM.render(
                <GameOver score = {this.state.score}/>,
                document.getElementById("triviaBox")
            )
        }
    }
    render() {
        let answers = [];
        for (let i = 0; i < 3; i++) {
            answers.push(entities.decode(this.state.wrongAnswers[i]));
        }
        answers.push(entities.decode(this.state.correctAnswer));
        // Ensure correct answer wont be the last option every time
        let indexedAnswers = answers.sort(function(a, b) {
            return a.length - b.length;
        });
        return (
            <div>
            <div className="question"> {entities.decode(this.state.question)} </div>
            <div></div>
            <div>
            <div className="answers">
                <button className="answerButton" onClick = {() => this.handleClick(indexedAnswers[0])}>
                {indexedAnswers[0]}</button>
                <button className="answerButton" onClick = {() => this.handleClick(indexedAnswers[1])}>
                {indexedAnswers[1]}</button>
                <button className="answerButton" onClick = {() => this.handleClick(indexedAnswers[2])}>
                {indexedAnswers[2]}</button>
                <button className="answerButton" onClick = {() => this.handleClick(indexedAnswers[3])}>
                {indexedAnswers[3]}</button>
            </div>
            </div>
            </div>
        );
    }
}

class GameOver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newGame: 0
        };
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        ReactDOM.render(
            <Trivia newGame = "1"/>,
                document.getElementById("triviaBox")
            )
    }
    render() {
        return  <div>
                    <div className="question"> You scored {this.props.score} out of 10! </div>
                    <div className="answers">
                        <button className="answerButton" onClick = {() => this.handleClick()}> New Game </button>
                    </div>
                </div>
    }
}
ReactDOM.render(
    <Trivia/>,
    document.getElementById("triviaBox")
    );
