'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Inform} from './Inform.jsx';
import {List} from './List.jsx';
class Routes extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            routes: undefined,
        }
    }

    loadData() {
        var routeList = this.props.route;
        var self = this;

        function statusDec(status) {

            switch (status) {
                case 1:
                    status = 'normal'
                    break;
                case 2:
                    status = 'duty'
                    break;
                case 3:
                    status = 'stoped'
                    break;
            }
            return status;
        }

        function statusParse(data) {
            var d = data;

            for (var i in d) {
                d[i].status = statusDec(d[i].status);
            }
            return d;
        }

        routeList = statusParse(routeList);

        self.setState({routes: routeList});
    }

    componentWillReceiveProps() {
        this.loadData();
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillMount() {
        this.loadData();
    }

    render() {

        return (
            <List horizontal={false} routeList={this.state.routes}/>
        );
    }

}

class Messages extends React.Component {

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


        function getDate(date) {
            var options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
            return new Date(date).toLocaleDateString('ru-RU', options);
        }


        if (this.state.messages != undefined) {
            return (
                <ul className="users-messages">
                    {this.state.messages.map(message =>
                        <li key={message.message_id} id={message.message_id}
                            className={"users-messages__message " + message.status}>
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

class Controls extends React.Component{


    render() {

        return (

            <div className="control">

            </div>

        );
    }

}

class Parent extends React.Component {

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.state = {
            tramRoutes: undefined,
            trollRoutes: undefined,
            info: undefined,
            messages: undefined
        }
    }

    loadData() {
        var routeInfo = this.props.routeInfo;
        var messages = this.props.messages;
        var status_info = this.props.status;
        var self = this;

        function status(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        }

        function json(response) {
            return response.json()
        }


        function typeParse(data) {
            var trolls = [],
                trams = [];
            data.map(route=> {
                    if (route.type == 1) {
                        trolls.push(route)
                    } else {
                        trams.push(route)
                    }
                }
            )
            self.setState({tramRoutes: statusParse(trams), trollRoutes: statusParse(trolls)});
        }

        function statusParse(data) {
            var d = data;
            for (var i in d) {
                switch (d[i].status) {
                    case 1:
                        d[i].status = 'normal';
                        break;
                    case 2:
                        d[i].status = 'duty';
                        break;
                    case 3:
                        d[i].status = 'stoped';
                        break;
                }
            }

            return d;
        }

        fetch(status_info)

            .then(status)
            .then(json)
            .then(typeParse)
            .catch(function (error) {
                console.log('Request failed', error);
            });

        fetch(routeInfo)
            .then(status)
            .then(json)
            .then(function (data) {
                self.setState({info: data});
            }).catch(function (error) {
            console.log('Request failed', error);
        });

        fetch(messages)

            .then(status)
            .then(json)
            .then(function (data) {
                self.setState({messages: data});
            }).catch(function (error) {
            console.log('Request failed', error);
        });
    }

/*    componentWillMount() {
        this.loadData();
    }*/

    componentDidMount() {
        this.loadData();
    }

    /*componentWillReceiveProps() {
        this.loadData();
    }*/

    render() {


        if (this.state.info == undefined || this.state.messages == undefined || this.state.tramRoutes == undefined || this.state.trollRoutes==undefined) {
            return <div>Loading...</div>
        }


        return (
            <div>
                <aside className="side-routes">
                    <Routes route={this.state.trollRoutes}/>
                    <Routes route={this.state.tramRoutes}/>
                </aside>
                <section className="main">
                    <Inform inform={this.state.info}/>
                    <Controls />
                    <hr />
                    <Messages messageList={this.state.messages}/>
                </section>
            </div>
        );
    }

}

ReactDOM.render(
    <Parent status="../dev/get_responses/status.json" routeInfo='../dev/get_responses/get_status_info.json' messages="../dev/get_responses/messages.json"/>,
    document.getElementById('parent')
);