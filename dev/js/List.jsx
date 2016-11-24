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

    render() {
        let routes = this.renderRoutes(this.props),
            classProp = this.props.classProp ? this.props.classProp : "";
        return (
            <ul className={"route-list " + classProp}>
                {routes}
            </ul>);
    }

}