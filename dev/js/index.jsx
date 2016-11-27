'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {List} from './List.jsx';
import {Inform} from './Inform.jsx'

function requestData(source) {
    let parsedData;


    return parsedData;
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.openInform = this.openInform.bind(this);
        this.getRouteData = this.getRouteData.bind(this);
        this.state = {
            tramRoutes: undefined,
            trollRoutes: undefined,
            informData: undefined
        }
    }

    openInform(id) {
        this.setState({informData: this.getRouteData('./get_responses/get_status_info.json')});
    }

    getRouteData(data){

        let self = this;
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

        fetch(data)
            .then(status)
            .then(json)
            .then(function (data) {
                self.setState({informData: data});
            }).catch(function (error) {
            console.log('Request failed', error);
        });

        function typeParse(data) {
            var trolls = [],
                trams = [];
            data.map(route=> {
                    if(route.type == 1){
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

    }


    loadData() {
        let routeStatus = this.props.routesStatus,
        self = this;


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

        fetch(routeStatus)
            .then(status)
            .then(json)
            .then(typeParse)
            .catch(function (error) {
                console.log('Request failed', error);
            });

        function typeParse(data) {
            var trolls = [],
                trams = [];
            data.map(route=> {
                    if(route.type == 1){
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


    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        if (this.state.tramRoutes == undefined || this.state.trollRoutes == undefined) {
            return <div>Loading...</div>
        }

        if (this.state.informData != undefined) {
            return (
                <div>
                    <Inform inform={this.state.informData}/>
                    <h2>Маршруты</h2>
                    <hr />
                    <h3> Троллейбусы: </h3>
                    <List horizontal={true} routeType="1" routeList={this.state.trollRoutes} action={this.openInform}/>
                    <h3> Трамваи: </h3>
                    <List horizontal={true} routeType="2" routeList={this.state.tramRoutes} action={this.openInform}/>
                </div>

            );
        }
        else {
            return (
                <div>
                    <h2>Маршруты</h2>
                    <hr />
                    <h3> Троллейбусы: </h3>
                    <List horizontal={true} routeType="1" routeList={this.state.trollRoutes} action={this.openInform}/>
                    <h3> Трамваи: </h3>
                    <List horizontal={true} routeType="2" routeList={this.state.tramRoutes} action={this.openInform}/>
                </div>

            );
        }


    }


}

ReactDOM.render(
    <App routesStatus="./get_responses/status.json"/>,
    document.getElementById('parent')
);