import React from 'react';
import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/allstyle.scss';

import { getUserLocation } from './Utlis/location'
import PageLoader from './components/pageLoading.component'
import CovidLive from './components/covidlive.component'

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }
    }

    setDefaults = () => {
        this.setState({
            regionData: { country: "INDIA", countryCode: "IN" },
            isLoading: false,
        });
    }

    componentDidMount() {
        if (navigator.geolocation) {
            const currentComponent = this;
            navigator.geolocation.getCurrentPosition(function (position) {
                const {latitude, longitude} = position.coords;

                const location = getUserLocation(latitude, longitude, "AIzaSyDnlRNVSSWEaFS8RsFEKMaPQ0SDXKbDjDI");
                location.then(data => {
                    currentComponent.setState({
                        regionData: data,
                        isLoading: false
                    });
                }).catch(err => currentComponent.setDefaults());
            },function(err){
                currentComponent.setDefaults();
            });
        }else{
            this.setDefaults();
        }
    }

    render() {
        const { isLoading, regionData } = this.state;
        return (
            <div className="App">
                <Container style={mt}>
                    <div className="cl-cardContainer">
                    { isLoading ? (
                        <Row style={whileLoading(this.state)}>
                            <PageLoader />
                        </Row>
                    ) : (
                        <CovidLive regionData={regionData} />
                    )}
                    </div>
                </Container>
            </div>
        )
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