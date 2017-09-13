import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Fetch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            answers: [],
            correctAnswer: []
        };
    }

    componentDidMount() {
        axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
        .then(data => {
            this.setState({questions: data.data.results[0].question,
                 correctAnswer: data.data.results[0].correct_answer, answers: data.data.results[0].incorrect_answers})
        })
    }

    render() {
        var style = {
            padding: "20px 20px 20px 20px"
        }
        var answers = [];

        for (let i = 0; i < this.state.answers.length; i++) {
            answers.push(this.state.answers[i]);
        }
        answers.push(this.state.correctAnswer);
        console.log(answers);

        // Ensure correct answer wont be the last option every time
        var indexedAnswers = answers.sort(function(a, b) {
            return a.length - b.length;
        })

        return <div>
                <div className="question"> {this.state.questions} </div>
                <div className="answers"> <button className="answerButton"> {indexedAnswers[0]} </button>
                                          <button className="answerButton"> {indexedAnswers[1]} </button> 
                                          <button className="answerButton"> {indexedAnswers[2]} </button> 
                                          <button className="answerButton"> {indexedAnswers[3]} </button> 
                </div>
              </div>
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