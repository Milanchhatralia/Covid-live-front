import React , {Component} from 'react';
import '../sass/allstyle.scss';
import { Row } from 'react-bootstrap';

import City from './city.component'
import State from './state.component'
import Country from './country.component'

import Navbar from './navbar.component'

import { fetchCovidCityData, fetchCovidStateData, fetchCovidCountryData } from '../Utlis/getCovidData';

export default class CovidLive extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
        }
    }

    componentWillMount(){
        const { regionData } = this.props;
        Object.keys(regionData).forEach(data=>{
            this.setState({ [data]: regionData[data] });
        });
        // this.setState({ isLoading: false });

        var { city, residential, state, country, state_code, country_code} = this.props.regionData;
        if (city === 'undefined' || city === '') city = residential;
        // CityData
        fetchCovidCityData(city).then((res) => {
            this.setState({
                cityData: res.data,
                isCityLoading: false,
            });
        }).catch((err) => {
            console.log(err);
        });
        // State data
        fetchCovidStateData(state).then((res) => {
            this.setState({
                stateData: res.data,
                isStateLoading: false,
            });
        }).catch((err)=>{
            console.log(err);
        });
        // Country Data
        fetchCovidCountryData(country).then((res) => {
            this.setState({
                countryData: res.data,
                isCountryLoading: false
            });
        }).catch((err)=>{
            console.log(err);
        });
        // World Data
        fetchCovidCountryData("world").then((res) => {
            this.setState({
                worldData: res.data,
                isWorldLoading: false
            });
        }).catch((err)=>{
            console.log(err);
        });
    }
    
    render(){
        let { country_code, isCityLoading, isStateLoading, isCountryLoading, isWorldLoading } = this.state;
        let { cityData, stateData, countryData, worldData } = this.state;
        return(
            <React.Fragment>
                <Row className="px-2">
                    <Navbar />
                </Row>
                <Row className="my-3">
                    <City {...cityData} isCityLoading={isCityLoading} />
                    <State {...stateData} isStateLoading={isStateLoading}/>
                    <Country {...countryData} countrycode={country_code} isCountryLoading={isCountryLoading}/>
                    <Country {...worldData} isWorldLoading={isWorldLoading}/>
                </Row>
            </React.Fragment>      
        )
    }
}