import React , {Component} from 'react';
import '../sass/allstyle.scss';
import { Row } from 'react-bootstrap';

import City from './city.component'
import State from './state.component'
import Country from './country.component'
import VaccineCenter from './vaccine.component'

import Navbar from './navbar.component'

import { fetchCovidCityData, fetchCovidStateData, fetchCovidCountryData } from '../Utlis/getCovidData';

export default class CovidLive extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            stateCode: props.stateCode,
            countryCode: props.countryCode,
        }
    }

    handleCityChange = (cityDate) => {
        this.setState({cityData: cityDate})
    }

    handleStateChange = (stateDate) => {
        this.setState({stateData: stateDate})
    }

    handleCountryChange = (countryData) => {
        this.setState({countryData: countryData})
    }

    componentWillMount(){
        const { regionData } = this.props;
        Object.keys(regionData).forEach(data=>{
            this.setState({ [data]: regionData[data] });
        });

        let { city, state, country, stateCode, countryCode} = this.props.regionData;
        
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
        let { countryCode, isCityLoading, isStateLoading, isCountryLoading, isWorldLoading } = this.state;
        let { cityData, stateData, countryData, worldData } = this.state;
        const {city} = this.state;
        return(
            <React.Fragment>
                <Row className="px-2">
                    <Navbar changeCity={this.handleCityChange} changeState={this.handleStateChange} changeCountry={this.handleCountryChange} />
                </Row>
                
                <Row className="my-3">
                    { cityData ? <City {...cityData} isCityLoading={isCityLoading} />:""}
                    { stateData ? <State {...stateData} isStateLoading={isStateLoading}/>: ""}
                    <Country {...countryData} countrycode={countryCode} isCountryLoading={isCountryLoading}/>
                    <Country {...worldData} isWorldLoading={isWorldLoading}/>
                </Row>
                { cityData && cityData.vaccine_centers ?<VaccineCenter city={cityData.city} vaccine_centers={cityData.vaccine_centers}/>: null}
                
            </React.Fragment>      
        )
    }
}