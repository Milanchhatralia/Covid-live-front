import axios from 'axios'
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/allstyle.scss';

import PageLoader from './components/pageLoading.component'
import CovidLive from './components/covidlive.component'
export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            allowLocation: true,
            geoLocError: false,
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
                    this.setState({
                        regionData: data,
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
            console.log('Sorry, Geolocation is not supported by this browser.');
        },{ enableHighAccuracy: true, maximumAge: 10000 });
    }

    componentDidMount() {
        if (navigator) { 
            navigator.permissions.query({name:'geolocation'}).then((result) => {
                if (result.state === 'granted') {
                    this.getLocationData();
                } else if (result.state === 'prompt') {
                    this.getLocationData();
                } else if (result.state === 'denied') {
                    this.setState({ allowLocation: false });
                }
                result.onchange = function() {

                }
            });
        }else{
            console.log('Sorry, Geolocation is not supported by this browser.');
            this.setState({ geoLocError: true });
        }
    }

    render() {
        const { isLoading, allowLocation, geoLocError, regionData } = this.state;
        return (
            <div className="App">
                <Container style={mt}>
                    <div className="cl-cardContainer">
                    { isLoading ? (
                        <Row style={whileLoading(this.state)}>
                        { !geoLocError ? (
                            <PageLoader />
                        ):(
                            <Col xs={12}>
                                <h1>:(
                                    <br/>
                                    Sorry, Geolocation is not supported by this browser.
                                    <br/>
                                    {/* <Button variant="primary" onClick={this.revokePermission()}>Give Permission</Button>{' '} */}
                                    </h1>  
                            </Col>
                        )}
                        </Row>
                    ) : (
                        <CovidLive regionData={regionData} />
                    )}
                    </div>
                </Container>
            </div>)
    }
}

const mt = {
    marginTop: '34px'
}

const whileLoading = (state) => {
    let isLoading = state.isLoading ? '50' :'';
    return{
        marginTop: `${isLoading}vh`,
        transform: `translateY(-${isLoading}%)`,
    }
}