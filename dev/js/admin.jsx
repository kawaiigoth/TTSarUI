'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Inform} from './Inform.jsx';
import {List} from './List.jsx';
import {Messages} from './messages.jsx';
import {Control} from './control.jsx';
class Routes extends React.Component {

    constructor(props) {
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
            <List classProp="route-list_inline route-list_scrollable" horizontal={false} routeList={this.state.routes} action={this.props.action}/>
        );
    }

}

class Parent extends React.Component {

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.openControl = this.openControl.bind(this);
        this.loadControls = this.loadControls.bind(this);
        this.transferData = this.transferData.bind(this);
        this.state = {
            tramRoutes: undefined,
            trollRoutes: undefined,
            info: undefined,
            messages: undefined,
            transferData: undefined,
            isError: false,
            isOppened: false
        }
    }


    openControl(id) {
        this.setState({informData: this.loadControls(id), isOppened: true});
    }


    loadControls(id){
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

        var myHeaders = new Headers();
        let options = {
            method : 'GET',
            headers:  myHeaders,
            mode: 'cors',
            cache: 'no-cache'
        };
        fetch('api/get-status-info?id=' + id, options)
            .then(status)
            .then(json)
            .then(function (data) {
                self.setState({info: data});
            }).catch(function (error) {
            console.log('statusinfo', error);
            self.setState({isError:true})
        });


    }

    transferData(message,photoPath){
        this.setState({transferData: [message,photoPath]})
    }

    loadData() {
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
            );
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

        var myHeaders = new Headers();
        let options = {
            method : 'GET',
            headers:  myHeaders,
            mode: 'cors',
            cache: 'no-cache'
        };

        fetch('api/messages', options)

            .then(status)
            .then(json)
            .then(function (data) {
                self.setState({messages: data});
            }).catch(function (error) {
            console.log('msg', error);
            self.setState({isError:true})
        });

        fetch('api/status', options)

            .then(status)
            .then(json)
            .then(typeParse)
            .catch(function (error) {
                console.log('status', error);
                self.setState({isError:true})
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

        if(this.state.isError == true){
            return <div> Sorry, an error occured while loading routes. Try reload page.</div>
        }

        if (this.state.tramRoutes == undefined || this.state.trollRoutes == undefined) {
            return <div>Loading...</div>
        }
        if(this.state.isOppened == true){
            if(this.state.info !=undefined && this.state.messages != undefined){
                return (
                    <div>
                        <aside className="side-routes">
                            <Routes route={this.state.trollRoutes} action={this.openControl}/>
                            <Routes route={this.state.tramRoutes} action={this.openControl}/>
                        </aside>
                        <section className="main">
                            <Inform inform={this.state.info} buttons={false}/>
                            <Control transferData={this.state.transferData? this.state.transferData: undefined} />
                            <hr />
                            <Messages action={this.transferData} classProp="messages_scrollable" messageList={this.state.messages}/>
                        </section>
                    </div>
                );
            }
            return (
                <div>
                    <aside className="side-routes">
                        <Routes route={this.state.trollRoutes} action={this.openControl}/>
                        <Routes route={this.state.tramRoutes} action={this.openControl}/>
                    </aside>
                </div>
            );
        }
        if(this.state.messages !=undefined){
            return (
                <div>
                    <h2>Маршруты</h2>
                    <hr />
                    <h3> Троллейбусы: </h3>
                    <List horizontal={true} routeType="1" routeList={this.state.trollRoutes} action={this.openControl}/>
                    <h3> Трамваи: </h3>
                    <List horizontal={true} routeType="2" routeList={this.state.tramRoutes} action={this.openControl}/>
                    <hr />
                    <Messages classProp="messages_scrollable" messageList={this.state.messages}/>
                </div>

            );
        }
        return (
            <div>
                <h2>Маршруты</h2>
                <hr />
                <h3> Троллейбусы: </h3>
                <List horizontal={true} routeType="1" routeList={this.state.trollRoutes} action={this.openControl}/>
                <h3> Трамваи: </h3>
                <List horizontal={true} routeType="2" routeList={this.state.tramRoutes} action={this.openControl}/>
            </div>

        );



    }

}

ReactDOM.render(
    <Parent/>,
    document.getElementById('parent')
);