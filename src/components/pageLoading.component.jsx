import React from 'react';
import { ReactComponent as Logo } from '../images/covid-live.svg';
import { ReactComponent as Msg } from '../images/loading.svg';
import { Col } from 'react-bootstrap';
const PageLoader = props => {
    return(
        <React.Fragment>
            <Col xs={12}>
                <Logo style={logoStyle} />
            </Col>
            <Col xs={12}>
                <Msg style={msgStyle} />
            </Col>
        </React.Fragment>
    )
}
const logoStyle = {
    width: '100%',
    height: '6rem'
}

const msgStyle = {
    marginTop: '3rem',
    width: '100%',
    height: '10rem'
}
export default PageLoader;