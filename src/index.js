import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Fetch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            answers: []
        };
    }

    componentDidMount() {
        axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
        .then( data => {
            this.setState({questions: data.data.results[0].question, answers: data.data.results[0].correct_answer})
            console.log(data);
        })
    }

    render() {
        var style = {
            padding: "20px 20px 20px 20px"
        }
        return (
            <div style = {style}>
                <p>{this.state.questions}</p>
                <p>{this.state.answers}</p>
            </div>
        )
    }
}


ReactDOM.render(
    <div> <Fetch/> </div>,
    document.getElementById("triviaBox")
)