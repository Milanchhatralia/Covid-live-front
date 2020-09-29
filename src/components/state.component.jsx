import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Loader from '../components/elements/loader.component';
import { numAbb } from '../Utlis/numAbb';
// import { isDay } from '../Utlis/dayNight';

const State = ({state, statecode, active, confirmed, recovered, deceased, deltaconfirmed, deltarecovered, deltadeceased, tested, testperthousand, isStateLoading})=>{
        return(
            <Col md={12} lg={8} className="px-2 mt-3">
                <div className="cl-regionCard">
                    <p className="cl-regionName">{state} &#8226; {statecode}</p>
                    { tested > 0 ? (<span className="cl-tested">Tested: <span>{numAbb(tested)}</span></span>) : ''}
                    
                    <Loader isLoading={isStateLoading}/>
                    <Row className="m-0">
                        <Col xs={6} lg={4} className="cl-dataContainer cl-active mt-3">
                            <span>Active</span>
                            <h4 style={dataColor(isStateLoading)}>
                                { numAbb(active) }
                            </h4>
                        </Col>
                        <Col xs={6} lg={4} className="cl-dataContainer cl-confirmed mt-3">
                            <span>Confirmed</span>
                            <h4 style={dataColor(isStateLoading)}>
                                { numAbb(confirmed) }
                                { deltaconfirmed > 0 ?<span className="delta"> &#8593;{deltaconfirmed}</span> : ''}
                            </h4>
                            
                        </Col>
                        <Col xs={6} lg={4}className="cl-dataContainer cl-testesperkilo mt-3 d-none d-md-block">
                            <span>Tested</span>
                            <h4 style={dataColor(isStateLoading)}>
                                ≈ { testperthousand }
                                <span className="delta"> /1000</span>
                            </h4>
                        </Col>
                        <Col xs={6} lg={4} className="cl-dataContainer cl-recovered mt-3">
                            <span>Recovered</span>
                            <h4 style={dataColor(isStateLoading)}>
                                { numAbb(recovered) }
                                { deltarecovered > 0 ?<span className="delta"> &#8593;{deltarecovered}</span> : ''}
                            </h4>
                        </Col>
                        <Col xs={6} lg={4} className="cl-dataContainer cl-deceased mt-3">
                            <span>Deceased</span>
                            <h4 style={dataColor(isStateLoading)}>
                                { numAbb(deceased) }
                                { deltadeceased > 0 ?<span className="delta"> &#8593;{numAbb(deltadeceased)}</span> : ''}
                            </h4>
                        </Col>
                        <Col xs={6} lg={4} className="cl-dataContainer cl-testesperkilo mt-3 d-block d-md-none">
                            <span>Tested</span>
                            <h4 style={dataColor(isStateLoading)}>
                                ≈ { testperthousand }
                                <span className="delta"> /1000</span>
                            </h4>
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

export default State;