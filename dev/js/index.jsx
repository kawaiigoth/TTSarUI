'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {View} from './route.jsx';
class Parent extends React.Component{

    constructor(props){
        super(props);
        this.renderRoutes = this.renderRoutes.bind(this);
    }

    renderRoutes(props){
        var info = props.routeList,
            fun = props.action;
        return(
            info.map(route =>
                <View key={route.way} status={route.status} way={route.way} type={route.type} action={fun}/>)
        );
    }
    render(){
        let routes = this.renderRoutes(this.props);
        return (
            <Child>
                {routes}
            </Child>);
    }

}

class Child extends React.Component{
    constructor(props){
        super(props);
    }
    render() {

        return (
            <ul className="route-list">
                {this.props.children}
            </ul>
        );
    }

}

class Inform extends React.Component{

    constructor(props){
        super(props);
        this.getInfo = this.getInfo.bind(this);
        this.drawData = this.drawData.bind(this);
        this.state = {
            data : undefined
        }
    }
    getInfo(id){
        var Id = id;
        var self = this;

        function getRoute(Id){
            return "../dev/get_responses/get_status_info.json"
        }

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
            var status = data.status;
            data.status = statusParse(status);
            return data;
        }

        function statusParse(data) {
            switch (data){
                case 1: data = 'normal';
                    break;
                case 2: data = 'duty';
                    break;
                case 3: data = 'stoped';
                    break;

            }

            return data;
        }

        function setData(data){
            console.log(data)
            self.setState({data:data})

        }

        fetch(getRoute(id))

            .then(status)
            .then(json)
            .then(typeParse)
            .then(setData)
            .catch(function(error) {
                console.log('Request failed', error);
            });


    }

    drawData(data){
        var well= "well-"+data.status;
        return(

            <div className={"well inform-window "+well}>
                <div className="inform-way">
                    <div className="route-box-wrap">
                        <div className={"route-box " + data.status}><div><span>{data.route.way}</span></div></div>
                    </div>
                </div>
                <div className="inform-message">
                <span>
                    {data.message}
                </span>
                </div>
                <div className="inform-actions">
                    <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                    <span id={data.route.type+"_"+data.route.way} data-toggle="modal" data-target="#SenderModal" className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>
                </div>
            </div>
        );
    }

    componentWillReceiveProps(){
        this.getInfo(this.props.inform);
    }

    componentDidMount(){
        this.getInfo(this.props.inform);
    }

    render(){

        if(this.state.data == undefined)
        {
            return(
                <div className="">Loading</div>
            )
        }
        else {
            return (
                <div className="">{this.drawData(this.state.data)}</div>
            );
        }
    }

}

class App extends  React.Component{
    constructor(props){
        super(props);
        this.openInform = this.openInform.bind(this);
        this.state = {
            tramRoutes  : undefined,
            trollRoutes : undefined,
            informData  : undefined
        }
    }

    openInform(id){
        this.setState({informData: id});
    }

    loadData(){
        var routeStatus = this.props.routesStatus;
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
            var trolls = data.trolls,
                trams = data.trams;
            self.setState({tramRoutes: statusParse(trams), trollRoutes: statusParse(trolls)});
        }

        function statusParse(data) {
            var d = data;
            for(var i in d)
            {
                switch (d[i].status){
                    case 1: d[i].status = 'normal'
                        break;
                    case 2: d[i].status = 'duty'
                        break;
                    case 3: d[i].status = 'stoped'
                        break;
                }
            }

            return d;
        }

        fetch(routeStatus)

            .then(status)
            .then(json)
            .then(typeParse)
            .catch(function(error) {
                console.log('Request failed', error);
            });
    }

    componentDidMount(){
        this.loadData()
    }

    render(){
        if ( this.state.tramRoutes == undefined || this.state.trollRoutes == undefined) {
            return <div>Loading...</div>
        }

        if(this.state.informData != undefined)
        {
            return (
                <div>
                    <Inform inform={this.state.informData}/>
                    <h2>Маршруты</h2>
                    <hr />
                    <h3> Троллейбусы: </h3>
                    <Parent routeType="1" routeList={this.state.trollRoutes} action={this.openInform}/>
                    <h3> Трамваи: </h3>
                    <Parent routeType="2" routeList={this.state.tramRoutes} action={this.openInform}/>
                </div>

            );
        }
        else{
            return (
                <div>
                    <h2>Маршруты</h2>
                    <hr />
                    <h3> Троллейбусы: </h3>
                    <Parent routeType="1" routeList={this.state.trollRoutes} action={this.openInform}/>
                    <h3> Трамваи: </h3>
                    <Parent routeType="2" routeList={this.state.tramRoutes} action={this.openInform}/>
                </div>

            );
        }


    }


}

ReactDOM.render(
    <App routesStatus="../dev/get_responses/status.json"/>,
    document.getElementById('parent')
);