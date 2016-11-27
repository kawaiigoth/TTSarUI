'use strict';
import React from 'react';
import {View} from './route.jsx';
export class Inform extends React.Component {

    constructor(props) {
        super(props);
        this.getInfo = this.getInfo.bind(this);
        this.drawData = this.drawData.bind(this);
        this.state = {
            data: undefined
        }
    }

    getInfo(data) {
        let self = this;

        self.setState({data: typeParse(data)});
        function typeParse(data) {

            var status = data.status;
            data.status = statusParse(status);
            console.log(data);
            return data;
        }

        function statusParse(data) {
            switch (data) {
                case 1:
                    data = 'normal';
                    break;
                case 2:
                    data = 'duty';
                    break;
                case 3:
                    data = 'stoped';
                    break;

            }

            return data;
        }

        function setData(data) {
            console.log(data);
            self.setState({data: data})

        }

        function showError(data) {
            console.log('err');
        }

    }

    drawData(data) {
        var well = "inform-window inform-window_" + data.status;
        if (this.props.buttons) {
            return (
                <div className={"well " + well}>
                    <div className="inform-window__way">
                        <View style={"inform-window__route-box"} status={data.status} way={data.route.way}
                              type={data.route.type}/>
                    </div>
                    <div className="inform-window__message">
                <span className="inform-window__text">
                    {data.message}
                </span>
                    </div>
                    <div className="inform-window__actions">
                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                        <span id={data.route.type + "_" + data.route.way} data-toggle="modal" data-target="#SenderModal"
                              className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>
                    </div>
                </div>
            )
        }
        return (

            <div className={"well " + well}>
                <div className="inform-window__way">
                    <View style={"inform-window__route-box"} status={data.status} way={data.route.way}
                          type={data.route.type}/>
                </div>
                <div className="inform-window__message">
                <span className="inform-window__text">
                    {data.message}
                </span>
                </div>

            </div>
        );
    }

    componentWillReceiveProps() {
        this.getInfo(this.props.inform);
    }

    componentDidMount() {
        this.getInfo(this.props.inform);
    }

    render() {

        if (this.state.data == undefined) {
            return (
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