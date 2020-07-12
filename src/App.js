import axios from 'axios'
import React from 'react';
import { Container, Row } from 'react-bootstrap';
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
                        // city: typeof data.city !== 'undefined' ? data.city : data.residential,
                        regionData: data,
                        // state: data.state,
                        // stateCode: data.state_code,
                        // country: data.country,
                        // countryCode: data.country_code,
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
            console.log('Please allow location access to get your region.');
            this.setState({ allowLocation: false });
        });
    }

    componentDidMount() {
        if (navigator.geolocation) {
            this.getLocationData()
        }
    }

    render() {
        const { isLoading, allowLocation, regionData } = this.state;
        return (
            <div className="App">
                <Container style={mt}>
                    <div className="cl-cardContainer">
                    { isLoading ? (
                        <Row style={whileLoading(this.state)}>
                        { allowLocation ? (
                            <PageLoader />
                        ):(
                            <h1>Please allow location access...</h1>  
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