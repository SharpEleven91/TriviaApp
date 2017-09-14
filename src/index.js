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
            result: []
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(props) {

        fetch("https://opentdb.com/api.php?amount=1&type=multiple")
        .then((res) => {
            return res.json();
        })
        .then((resJson) => {
            // this.setState({result: resJson.results[0]});
            this.setState({result: resJson.results[0]});
        })
        .catch((error) => {
            console.log(error);
        });

        ReactDOM.render(
            <Trivia counter = {this.props.counter+1}/>,
            document.getElementById("triviaBox")
        )
    }

    componentDidUpdate() {
        console.log(this.state.result);
    }
    render() {
        return (
            <div>
            <div> {entities.decode(this.state.result.question)} </div>
            <div></div>
            <div className="answers">
            <div className="answerButton"><button onClick = {() => this.handleClick()}> {this.props.counter} </button></div>
            </div>
            </div>
        )
    }
}
ReactDOM.render(
    <Trivia counter = "0" />,
    document.getElementById("triviaBox")
    );
