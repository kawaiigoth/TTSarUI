'use strict';
import React from 'react';
export class Message extends React.Component{

    constructor(props){
        super(props);
    }

render(){
    function getDate(date) {
        var options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        return new Date(date).toLocaleDateString('ru-RU', options);
    }

    let message = this.props.message;
    return(
        <div  id={message.message_id} className={"users-messages__message " + message.status}>
            <div className="users-messages__message__image">
                <a className="photo" href={message.photo.replace("thumbs", "fullsize")}
                   title={message.message}>
                    <img src={message.photo} width="50" height="50" alt="photo"/>
                </a>
            </div>
            <div className="users-messages__message__info">
                <span className="users-messages__message__info__text">{message.message}</span>
                {/*<span class="users-messages__message__info__name">{message.author}:</span>*/}
                <span className="users-messages__message__info__time">{getDate(message.datetime)}</span>
            </div>
        </div>
    )
}
}
