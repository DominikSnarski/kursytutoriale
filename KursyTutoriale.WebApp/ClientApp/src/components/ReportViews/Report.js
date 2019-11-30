import React, { Component } from 'react';
// eslint-disable-next-line
import { Link, button } from 'react-router-dom';
import './Report.css'

class Report extends Component {
    constructor() {
        super();

        this.state = {
            spam: false,
            hateSpeech: false,
            violenceOrHarmfulBehavior: false,
            sexualContent:false

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
            <div id="Container">
                <div id="Header">
                    Report
                </div>
                <div className="Question">
                    Why you want to report this comment?
                </div>
                <div className="FormCenter">
                    <form onSubmit={this.handleSubmit} className="FormFields">
                        <div className="List">
                            <div className="Item">
                                <input type="checkbox" className="spam" value={this.state.spam} on onChange={this.handleChange}></input>Spam
                            </div> 
                            <div className="Item">
                                <input type="checkbox" className="hateSpeech" value={this.state.hateSpeech} on onChange={this.handleChange}></input>Hate speech
                            </div>
                            <div className="Item">
                                <input type="checkbox" className="violenceOrHarmfulBehavior" value={this.state.violenceOrHarmfulBehavior} on onChange={this.handleChange}></input>Violence or harmful behavior
                            </div>
                            <div className="Item">
                                <input type="checkbox" className="sexualContent" value={this.state.sexualContent} on onChange={this.handleChange}></input>Sexual content
                            </div>
                        </div>
                        <div className="Button">
                            <button className="MyButton" >Report</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Report;