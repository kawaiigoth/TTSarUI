'use strict';
import React from 'react';
import {View} from './route.jsx';
export class List extends React.Component {

    constructor(props) {
        super(props);
        this.renderRoutes = this.renderRoutes.bind(this);
    }

    renderRoutes(props) {
        let info = props.routeList,
            listType = props.horizontal ? "route-list__element_horizontal" : "",
            fun = props.action;
        return (
            info.map(route =>
                <li key={route.type + "_" + route.way} className={"route-list__element " + listType}>
                    <View status={route.status} way={route.way} type={route.type} action={fun}/>
                </li>)
        );


    }

    shouldComponentUpdate(nextProps,nextState){
        if(this.props == nextProps)
        {
            return false;
        }
        else return true;

    };

    componentDidMount(){
        console.log("list did mounted");
    }

    componentWillReceiveProps(){
        console.log("list wiil receive props");
    }

    componentDidUpdate(){
        console.log("list updated");
    }

    ponentWillUnmount(){
        console.log("list bye =(");
    }

    render() {
        let routes = this.renderRoutes(this.props),
            classProp = this.props.classProp ? this.props.classProp : "";
        return (
            <ul className={"route-list " + classProp}>
                {routes}
            </ul>);
    }

}