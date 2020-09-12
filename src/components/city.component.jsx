import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Loader from '../components/elements/loader.component';
import { numAbb } from '../Utlis/numAbb';

// export default class City extends Component{
const City = ({city, tested, isCityLoading, active, confirmed, deltaconfirmed, recovered, deltarecovered, deaths, deltadeaths}) => {
    return(
        <Col md={12} lg={4} className="px-2 mt-3">
            <div className="cl-regionCard">
                <p className="cl-regionName">{city}</p>
                <span className="cl-tested">Tested: <span>{tested}</span></span>
                <Loader isLoading={isCityLoading}/>
                <Row className="m-0">
                    <Col xs={6} className="cl-dataContainer cl-active mt-3">
                        <span>Active</span>
                        <h4 style={dataColor(isCityLoading)}>
                            { numAbb(active) }
                        </h4>
                    </Col>
                    <Col xs={6} className="cl-dataContainer cl-confirmed mt-3">
                        <span>Confirmed</span>
                        <h4 style={dataColor(isCityLoading)}>
                            { numAbb(confirmed) }
                            { numAbb(deltaconfirmed) > 0 ?<span className="delta"> &#8593;{deltaconfirmed}</span> : ''}
                        </h4>
                        
                    </Col>
                    <Col xs={6} className="cl-dataContainer cl-recovered mt-3">
                        <span>Recovered</span>
                        <h4 style={dataColor(isCityLoading)}>
                            { numAbb(recovered) }
                            { numAbb(deltarecovered) > 0 ?<span className="delta"> &#8593;{deltarecovered}</span> : ''}
                        </h4>
                    </Col>
                    <Col xs={6} className="cl-dataContainer cl-deceased mt-3">
                        <span>Deceased</span>
                        <h4 style={dataColor(isCityLoading)}>
                            { numAbb(deaths) }
                            { numAbb(deltadeaths) > 0 ?<span className="delta"> &#8593;{deltadeaths}</span> : ''}
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

export default City;