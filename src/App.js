import axios from 'axios'
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/allstyle.scss';

import City from './components/city.component'
import State from './components/state.component'
import Country from './components/country.component'

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            allowLocation: true,
        }
    }

    getLocation() {
        const { lat, long } = this.state;
        let locationURL = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=3a9950e91847442ab69b7c1a9733b192`
        axios
            .get(locationURL)
            .then(res => {
                let data = res.data.results[0].components;
                if (typeof data !== 'undefined') {
                    console.log(data)
                    this.setState({
                        city: typeof data.city !== 'undefined' ? data.city : data.residential,
                        state: data.state,
                        stateCode: data.state_code,
                        country: data.country,
                        countryCode: data.country_code,
                        isLoading: false
                    });
                }
            })
            .catch(err => {
                this.setState({ error: true, err });
            });
    }

    getLocationData = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ lat: position.coords.latitude, long: position.coords.longitude });
            this.getLocation();
        }, (err) => {
            // User didn't allowed to access location
            console.log('Please help us to get your location.');
            this.setState({ allowLocation: false });
        });
    }

    componentDidMount() {
        if (navigator.geolocation) {
            this.getLocationData()
        }
    }

    render() {
        const { isLoading } = this.state;
        return (
            <div className="App">

                <header className="">

                </header>
                <Container style={mt}>
                    <div className="cl-cardContainer">
                        { isLoading ? (
                            <Row><h1>Loading...</h1></Row>
                        ) : (
                            <Row>
                                <Col md={12} lg={4} className="px-2"><City city={this.state.city} /></Col>
                                <Col md={12} lg={4} className="px-2"><State state={this.state.state} stateCode={this.state.stateCode} /></Col>
                                <Col md={12} lg={4} className="px-2"><Country country={this.state.country} countryCode={this.state.countryCode} /></Col>
                            </Row>
                        )}
                    </div>
                    
                </Container>
            </div>)
    }
}

const mt = {
    marginTop: '34px'
}