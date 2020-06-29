import React, {Component} from 'react';
import { Col } from 'react-bootstrap'


export default class State extends Component{
    render() {
        return(
            <div className="cl-regionCard">
                <p className="cl-regionName">{this.props.state}</p>
                <div className="flex">
                    <div className="active">

                    </div>
                    <div className="confirmed">
                        
                    </div>
                    <div className="deseased">
                        
                    </div>
                </div>
            </div>
        )
    }
}