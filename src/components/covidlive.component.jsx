import React , {Component} from 'react';
import '../sass/allstyle.scss';
import { Row, Col } from 'react-bootstrap';

import City from './city.component'
import State from './state.component'
import Country from './country.component'

export default class CovidLive extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
        }
    }

    componentWillMount(){
        const { regionData } = this.props;
        Object.keys(regionData).forEach(data=>{
            this.setState({ [data]: regionData[data] });
        });
        // this.setState({ isLoading: false });
    }

    componentDidUpdate(){
        
    }
    
    render(){
        const { city, state, country, state_code, country_code, isLoading } = this.state;
        return(
            <React.Fragment>
                <Row className="my-5">
                    <Col md={12} lg={4} className="px-2 mt-3"><City city={city} isLoading={isLoading} /></Col>
                    <Col md={12} lg={8} className="px-2 mt-3"><State state={state} stateCode={state_code} isLoading={isLoading}/></Col>
                    <Col md={12} className="px-2 mt-3"><Country country={country} countryCode={country_code} isLoading={isLoading}/></Col>
                    <Col md={12} className="px-2 mt-3"><Country country="world" isLoading={isLoading}/></Col>
                </Row>
            </React.Fragment>      
        )
    }
}