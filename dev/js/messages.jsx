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
let classProp = this.props.classProp ? this.props.classProp : "";
        if (this.state.messages != undefined) {
            return (
                <ul className={"messages " + classProp}>
                    {this.state.messages.map(message =>
                        <li key={message.message_id} className="messages__element">
                            <Message action={this.props.action} message={message}/>
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