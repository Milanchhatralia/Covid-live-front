import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Loader from '../components/elements/loader.component';
import { numAbb } from '../Utlis/numAbb';
import WorldLogo from '../images/world.png';
import { isDay } from '../Utlis/dayNight';

const Country = ({country, countrycode, active, cases, recovered, deaths, critical, totalTests, todayCases,todayDeaths, casesPerOneMillion, deathsPerOneMillion, testsPerOneMillion, isCountryLoading}) => {
    
    let iconSrc = country === 'World' ? WorldLogo.toString() : `https://www.countryflags.io/${countrycode}/shiny/64.png`;
    return(
        <Col md={12} className="px-2 mt-3">
            <div className="cl-regionCard">
                <img className="flag" src={iconSrc} width="20px" alt=""/>
                <p className="cl-regionName text-uppercase">{country}</p>
                <Loader isLoading={isCountryLoading}/>
                { totalTests > 0 ? (<span className="cl-tested">Tested: <span>{totalTests}</span></span>) : ''}
                <Row className="m-0">
                    <Col xs={6} lg={2} className="cl-dataContainer cl-active clc-data mt-3">
                        <span>Active</span>
                        <h4 style={dataColor(isCountryLoading)}>
                            { numAbb(active) }
                        </h4>
                    </Col>
                    <Col xs={6} lg={2} className="cl-dataContainer clc-data mt-3">
                        <span>Confirmed</span>
                        <h4 style={dataColor(isCountryLoading)}>
                            { numAbb(cases) }
                            { todayCases > 0 ?<span className="delta delta-confirmed"> &#8593;{numAbb(todayCases)}</span> : ''}
                        </h4>
                        
                    </Col>
                    <Col xs={6} lg={2} className="cl-dataContainer clc-data mt-3">
                        <span>Recovered</span>
                        <h4 style={dataColor(isCountryLoading)}>
                            { numAbb(recovered) }
                            {/* { deltarecovered > 0 ?<span className="delta delta-recovered"> &#8593;{numAbb(deltarecovered)}</span> : ''} */}
                        </h4>
                    </Col>
                    <Col xs={6} lg={2} className="cl-dataContainer clc-data mt-3">
                        <span>Deceased</span>
                        <h4 style={dataColor(isCountryLoading)}>
                            { numAbb(deaths) }
                            { todayDeaths > 0 ?<span className="delta"> &#8593;{numAbb(todayDeaths)}</span> : ''}
                        </h4>
                    </Col>
                    <Col xs={12} lg={4} className="cl-dataContainer clc-data clc-million mt-3">
                        <span>Per Million</span>
                        <div className="d-flex justify-content-between">
                            <h4 style={dataColor(isCountryLoading)}>
                                { casesPerOneMillion > 0 ? (numAbb(casesPerOneMillion)) : 'NA' }
                                <span className="delta">cases</span>
                            </h4>
                            <h4 style={dataColor(isCountryLoading)}>
                                { testsPerOneMillion > 0 ? (numAbb(testsPerOneMillion)) : 'NA' }
                                <span className="delta">tests</span>
                            </h4>
                            <h4 style={dataColor(isCountryLoading)}>
                                { deathsPerOneMillion > 0 ? (numAbb(deathsPerOneMillion)) : 'NA' }
                                <span className="delta">deaths</span>
                            </h4>
                        </div>
                        
                    </Col>
                </Row>
            </div>
        </Col>
    )
}

const dataColor = isLoading => {
    let loading = isLoading? '#fffed1' : '';
    return{ 
        color: loading,
    }
}

export default Country;