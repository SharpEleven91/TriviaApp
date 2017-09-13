import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import jquery from 'jquery';
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class Fetch extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            questions: [],
            answers: [],
            correctAnswer: [],
            score: 0,
            rounds: 0,
        };

    }
    componentDidMount() {
        axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
        .then(data => {
            this.setState({questions: data.data.results[0].question,
                 correctAnswer: data.data.results[0].correct_answer, answers: data.data.results[0].incorrect_answers})
        })
    }

    handleClick(answer) {
        var correct = this.state.correctAnswer;
        if (answer == correct) {
            this.setState((prevState, props) => {
                return {score: prevState.score + 1}
            })
            console.log("Correct!")
        }

        this.setState((prevState, props) => {
            return {rounds: prevState.rounds + 1};
        });
        if (this.state.rounds != 10) {
            ReactDOM.render(
                <Fetch/>,
                document.getElementById("triviaBox")
            )
        } else {
            ReactDOM.render(
                <div> You've scored {this.state.score} out of 10!</div>,
                document.getElementById("triviaBox")
            )
        }
    }

    render() {
        var style = {
            padding: "20px 20px 20px 20px"
        }
        var answers = [];

        for (let i = 0; i < this.state.answers.length; i++) {
            answers.push(entities.decode(this.state.answers[i]));
        }
        answers.push(this.state.correctAnswer);

        // Ensure correct answer wont be the last option every time
        var indexedAnswers = answers.sort(function(a, b) {
            return a.length - b.length;
        });
        return (<div>
                <div className="question">{entities.decode(this.state.questions)}</div>
                <div> </div>
                <div className="answers"> <button className="answerButton" onClick = { () => this.handleClick(indexedAnswers[0])}> {indexedAnswers[0]} </button>
                                          <button className="answerButton" onClick = { () => this.handleClick(indexedAnswers[1])}> {indexedAnswers[1]} </button> 
                                          <button className="answerButton" onClick = { () => this.handleClick(indexedAnswers[2])}> {indexedAnswers[2]} </button> 
                                          <button className="answerButton" onClick = { () => this.handleClick(indexedAnswers[3])}> {indexedAnswers[3]} </button> 
                </div>
              </div>
        )
    }
}

class NewGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "newGame": 0
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({newGame: 1})
    }

    render() { 
        if (this.state.newGame == 0) {
            return <div className = "starter">
                <button className="newGameButton" onClick = {() => this.handleClick()}> START NEW GAME </button>
                </div>
        } else {
            return <Fetch/>
        }
    }
}


ReactDOM.render(
    <div> <NewGame/> </div>,
    document.getElementById("triviaBox")
)