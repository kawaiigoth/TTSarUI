'use strict';
import React from 'react';
export class View extends React.Component{

    constructor(props) {
        super(props)
    }
    render(){
        var routeBox = this.props.style ? "route-box " + this.props.style : "route-box";
        if(this.props.action){
            return(
                <div id={this.props.type+"_"+this.props.way} className={routeBox}
                     onClick={()=>{this.props.action(this.props.type+"_"+this.props.way)}} >
                    <div className={"route-box__inner " + this.props.status}>
                        <div className="route-box__table">
                            <span className="route-box__cell route-box__text">{this.props.way}</span>
                        </div>
                    </div>
                </div>
            )
        }
       else{
            return(
                <div id={this.props.type+"_"+this.props.way} className={routeBox}>
                    <div className={"route-box__inner " + this.props.status}>
                        <div className="route-box__table">
                            <span className="route-box__cell route-box__text">{this.props.way}</span>
                        </div>
                    </div>
                </div>
            )
       }
    }
}
