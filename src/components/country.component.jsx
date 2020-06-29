import React, {Component} from 'react';
import { Col } from 'react-bootstrap'

export default class Country extends Component{
    
    render() {
        return(
            <div className="cl-regionCard">
                <p>{this.props.country}</p>
            </div>
        )
    }
}