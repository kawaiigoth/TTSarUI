'use strict';
import React from 'react';
export class View extends React.Component{

    constructor(props) {
        super(props)
    }
    render(){
        return(
            <li id={this.props.type+"_"+this.props.way} className="route-box-wrap"
                onClick={()=>{this.props.action(this.props.type+"_"+this.props.way)}} >
                <div className={"route-box " + this.props.status}><div><span>{this.props.way}</span></div></div>
            </li>
        )
    }
}
