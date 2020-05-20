import React, { Component } from 'react';
import * as signalIR from '@microsoft/signalr';
import apiClient from '../../api/ApiClient';
import Button from '../../layouts/CSS/Button/Button';
import { Input,Container,Jumbotron } from 'reactstrap';
class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courseid: '',
            username: '',
            message: '',
            messages: [],
            hubConnection: null,
            inGroup: false
        };
    }

    componentDidMount = () => {
        this.setState({ courseid: this.props.courseid });
        const username = this.props.username;

        const connectionString = apiClient.baseURL;

        const hubConnection = new signalIR.HubConnectionBuilder()
            .configureLogging(signalIR.LogLevel.Information)
            .withAutomaticReconnect()
            .withUrl(connectionString + "hub", {
                skipNegotiation: true,
                transport: signalIR.HttpTransportType.WebSockets
            })
            .build();

        this.setState({ hubConnection, username }, () => {
            this.state.hubConnection
                .start();


            this.state.hubConnection.on('GetMessage', (receivedMessage) => {
                const messages = this.state.messages.concat([receivedMessage]);
                this.setState({ messages });
            });

        });



    }

    sendMessage = () => {

        if (!this.state.inGroup) {
            this.state.hubConnection
                .invoke('AddToRoom', this.state.courseid, this.state.username);

            this.setState({ inGroup: true });
        }

        this.state.hubConnection
            .invoke('SendMessageToGroup', this.state.courseid, this.state.username, this.state.message);

        this.setState({ message: '' });

    };

    render() {
        return (
            <Container className="Container">
                <br />

                <div className="input-group">
                    <div className="input-group-prepend">
                        <Button onClick={this.sendMessage} text="Send" ></Button>
                    </div>

                    <Input
                        overflow="auto"
                        type="text"
                        value={this.state.message}
                        onChange={e => this.setState({ message: e.target.value })}
                    />
                </div>





                <Jumbotron style={{height:200,overflow:"auto"}} >
                    {this.state.messages.map((message, index) => (
                        <span style={{ display: 'block' }} key={index}> {message} </span>
                    ))}
                    </Jumbotron>
            </Container>
        );
    }
}

export default Chat;