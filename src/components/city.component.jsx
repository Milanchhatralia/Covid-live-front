import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Loader from '../components/elements/loader.component';
import { numAbb } from '../Utlis/numAbb';

// export default class City extends Component{
const City = ({city, tested, isCityLoading, active, confirmed, deltaconfirmed, recovered, percent_vaccinated,
    vaccinated, deltarecovered, deaths, deltadeaths}) => {

    return(
        <Col md={12} lg={6} className="px-2 mt-3">
            <div className="cl-regionCard">
                <p className="cl-regionName">{city}</p>
                <span className="cl-card-chip">Vaccinated: <span>{numAbb(vaccinated)}</span></span>
                <Loader isLoading={isCityLoading}/>
                <Row className="m-0">
                    <Col xs={6} lg={4} className="cl-dataContainer cl-active mt-3">
                        <span>Active</span>
                        <h4>
                            { numAbb(active) }
                        </h4>
                    </Col>
                    <Col xs={6} lg={4} className="cl-dataContainer cl-confirmed mt-3">
                        <span>Confirmed</span>
                        <h4>
                            { numAbb(confirmed) }
                            { numAbb(deltaconfirmed) > 0 ?<span className="delta"> &#8593;{deltaconfirmed}</span> : ''}
                        </h4>
                        
                    </Col>
                    <Col xs={6} lg={4} className="cl-dataContainer cl-recovered mt-3">
                        <span>Recovered</span>
                        <h4>
                            { numAbb(recovered) }
                            { numAbb(deltarecovered) > 0 ?<span className="delta"> &#8593;{deltarecovered}</span> : ''}
                        </h4>
                    </Col>
                    <Col xs={6} lg={4} className="cl-dataContainer cl-deceased mt-3">
                        <span>Deceased</span>
                        <h4>
                            { numAbb(deaths) }
                            { numAbb(deltadeaths) > 0 ?<span className="delta"> &#8593;{deltadeaths}</span> : ''}
                        </h4>
                    </Col>
                    <Col  xs={6} lg={4} className="cl-dataContainer cl-vaccinated mt-3 ">
                        <span>Vaccinated</span>
                        <h4>
                            { percent_vaccinated }%
                            <span className="delta"> &nbsp;{ numAbb(vaccinated)}</span>
                        </h4>
                        <span style={pseudoLine(percent_vaccinated)} className="-pseudo-line"></span>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}

const pseudoLine = percent_vaccinated => {
    percent_vaccinated = Math.round(percent_vaccinated);
    return{
        backgroundImage: `linear-gradient(90deg, #3f914e ${percent_vaccinated}%, #e9fae9 ${percent_vaccinated}%, #e9fae9 100%)`,
    }
}
export default City;