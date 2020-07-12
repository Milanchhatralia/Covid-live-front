import React, {Component} from 'react';
import axios from 'axios'
import { Col, Row } from 'react-bootstrap';
import Loader from '../components/elements/loader.component';
import { numAbb } from '../Utlis/numAbb';
import { countryURI } from '../Utlis/URI';
import WorldLogo from '../images/world.png';
import { isDay } from '../Utlis/dayNight';

export default class Country extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            isLoading: this.props.isLoading,
        }
    }

    getCovidCountryData = () => {
        var { country } = this.props;
        axios
            .get(`${countryURI}/${country}`)
            .then(res => {
                let covidData = res.data;
                this.setState({isLoading: false});
                console.log(res);
                console.log(typeof(covidData));
                if (typeof(covidData) == 'object'){
                    this.setState({
                        active: covidData.active,
                        confirmed: covidData.cases,
                        deceased: covidData.deaths,
                        recovered: covidData.recovered,
                        critical: covidData.critical,
                        deltaconfirmed: covidData.todayCases,
                        deltarecovered: covidData.todayRecovered,
                        deltadeceased: covidData.todayDeaths,
                        tested: covidData.totalTests,
                        casesPerOneMillion: covidData.casesPerOneMillion,
                        deathsPerOneMillion: covidData.deathsPerOneMillion,
                        testsPerOneMillion: covidData.testsPerOneMillion,
                    });
                    console.log('1');
                }else if (covidData.length > 1){
                    console.log('More than 1');
                }else if (covidData.length < 1){
                    this.setState({ cityData: false });
                    console.log('0');
                }
            })
            .catch(err => {
                this.setState({ error: true, err });
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getCovidCountryData();
        }
    }

    componentDidMount() {
        this.getCovidCountryData();
    }

    render() {

        var { country, countryCode } = this.props;
        var iconSrc = country === 'world' ? WorldLogo.toString() : `https://www.countryflags.io/${countryCode}/shiny/64.png`;
        var { active, confirmed, recovered, deceased, tested, deltaconfirmed, deltarecovered, deltadeceased, casesPerOneMillion, deathsPerOneMillion, testsPerOneMillion, isLoading } = this.state;
        return(
            <div className="cl-regionCard">
                <img className="flag" src={iconSrc} width="20px" alt=""/>
                <p className="cl-regionName text-uppercase">{country}</p>
                <Loader isLoading={isLoading}/>
                { tested > 0 ? (<span className="cl-tested">Tested: <span>{tested}</span></span>) : ''}
                <Row className="m-0">
                    <Col xs={6} lg={2} className="cl-dataContainer cl-active clc-data mt-3">
                        <span>Active</span>
                        <h4 style={dataColor(this.state)}>
                            { numAbb(active) }
                        </h4>
                    </Col>
                    <Col xs={6} lg={2} className="cl-dataContainer clc-data mt-3">
                        <span>Confirmed</span>
                        <h4 style={dataColor(this.state)}>
                            { numAbb(confirmed) }
                            { deltaconfirmed > 0 ?<span className="delta delta-confirmed"> &#8593;{numAbb(deltaconfirmed)}</span> : ''}
                        </h4>
                        
                    </Col>
                    <Col xs={6} lg={2} className="cl-dataContainer clc-data mt-3">
                        <span>Recovered</span>
                        <h4 style={dataColor(this.state)}>
                            { numAbb(recovered) }
                            { deltarecovered > 0 ?<span className="delta delta-recovered"> &#8593;{numAbb(deltarecovered)}</span> : ''}
                        </h4>
                    </Col>
                    <Col xs={6} lg={2} className="cl-dataContainer clc-data mt-3">
                        <span>Deceased</span>
                        <h4 style={dataColor(this.state)}>
                            { numAbb(deceased) }
                            { deltadeceased > 0 ?<span className="delta"> &#8593;{numAbb(deltadeceased)}</span> : ''}
                        </h4>
                    </Col>
                    <Col xs={12} lg={4} className="cl-dataContainer clc-data clc-million mt-3">
                        <span>Per Million</span>
                        <div className="d-flex justify-content-between">
                            <h4 style={dataColor(this.state)}>
                                { casesPerOneMillion > 0 ? (numAbb(casesPerOneMillion)) : 'NA' }
                                <span className="delta">cases</span>
                            </h4>
                            <h4 style={dataColor(this.state)}>
                                { testsPerOneMillion > 0 ? (numAbb(testsPerOneMillion)) : 'NA' }
                                <span className="delta">tests</span>
                            </h4>
                            <h4 style={dataColor(this.state)}>
                                { deathsPerOneMillion > 0 ? (numAbb(deathsPerOneMillion)) : 'NA' }
                                <span className="delta">deaths</span>
                            </h4>
                        </div>
                        
                    </Col>
                </Row>
            </div>
        )
    }
    
}

const dataColor = state => {
    let loading = state.isLoading? '#fffed1' : '';
    return{ 
        color: loading,
    }
}