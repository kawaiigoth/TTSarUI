'use strict';
import React from 'react';
export class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        function getDate(date) {
            var options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
            return new Date(date).toLocaleDateString('ru-RU', options);
        }

        let message = this.props.message;
        return (
            <div id={message.message_id} className={"message " + message.status}>
                <div className="message__image">
                    <a className="photo" href={message.photo.replace("thumbs", "fullsize")}
                       title={message.message}>
                        <img src={message.photo} width="50" height="50" alt="photo"/>
                    </a>
                </div>

                <div className="message__info">
                    <div className="message__text">
                        <span>{message.message}</span>
                    </div>
                    {/*<span class="users-messages__message__info__name">{message.author}:</span>*/}
                    <div className="message__time">
                        <span className="message__time">{getDate(message.datetime)}</span>
                    </div>
                </div>
            </div>
        )
    }
}
