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
        if (message.photo != undefined){
            return (
                <div id={message.message_id} className={"message " + message.status}>

                    <div className="message__info">
                        <div className="message__text">
                            <span>{message.message}</span>
                        </div>
                        <div className="message__time">
                            <span className="message__time">Дата: {getDate(message.datetime)}</span>
                        </div>
                        <div className="message__photo">
                            <span className="message__time"><a href={message.photo}>Фото</a></span>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div id={message.message_id} className={"message " + message.status}>

                <div className="message__info">
                    <div className="message__text">
                        <span>{message.message}</span>
                    </div>
                    <div className="message__time">
                        <span className="message__time">Дата: {getDate(message.datetime)}</span>
                    </div>
                </div>
            </div>
        )

    }
}
