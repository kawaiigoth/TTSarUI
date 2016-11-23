'use strict';
import React from 'react';
import {Message} from './message.jsx';
export class Messages extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            messages: undefined
        }

    }

    componentDidMount() {
        var messageList = this.props.messageList;
        this.setState({messages: messageList});
    }


    render() {

        if (this.state.messages != undefined) {
            return (
                <ul className="users-messages">
                    {this.state.messages.map(message =>
                        <li key={message.message_id}>
                            <Message message={message}/>
                        </li>
                    )}

                </ul>
            )
        }
        else {
            return (
                <div>
                    Loading...
                </div>
            )

        }


    }
}