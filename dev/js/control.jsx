'use strict';
import React from 'react';
export class Control extends React.Component{

    constructor(props){
        super(props);
    }
    render(){
        return(
        <div>
            <form>
                <input type="radio" name="route-state" value={'normal'}/>
                <input type="radio" name="route-state" value={'duty'}/>
                <input type="radio" name="route-state" value={'stoped'}/>
                <input type="text"/>
                <input type="file"/>
                <button>Submit</button>
            </form>
        </div>
        )
    }
}