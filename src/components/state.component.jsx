import React, {Component} from 'react';
import axios from 'axios'
import { Col, Row } from 'react-bootstrap';
import Loader from '../components/elements/loader.component';
import { numAbb } from '../Utlis/numAbb';
import { covid19API, localAPI } from '../Utlis/URI';
import { isDay } from '../Utlis/dayNight';

export default class State extends Component{

    constructor(props) {
        super(props)
        this.state = {
            active: '00',
            confirmed: '00',
            deceased: '00',
            recovered: '00',
            deltaconfirmed: '00',
            deltadeaths: '00',
            deltarecovered: '00',
            isLoading: this.props.isLoading,
            dataObjects: ['active','confiremed','recovered','deaths','deltaconfirmed','deltarecovered','deltadeaths'],
        }
    }

    getCovidStateData = () => {
        const { state } = this.props;
        axios
            .get(`${covid19API}/state/${state}`)
            .then(res => {
                let covidData = res.data;
                this.setState({isLoading: false});
                console.log(res);
                console.log(covidData.length);
                if (covidData.length === 1){
                    this.setState({
                        active: covidData[0].active,
                        confirmed: covidData[0].confirmed,
                        deceased: covidData[0].deceased,
                        recovered: covidData[0].recovered,
                        deltaconfirmed: covidData[0].deltaconfirmed,
                        deltadeaths: covidData[0].deltadeaths,
                        deltarecovered: covidData[0].deltarecovered,
                        tested: covidData[0].tested,
                        testperthousand: covidData[0].testperthousand,
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
            this.getCovidStateData();
        }
    }

    componentDidMount() {
        this.getCovidStateData();
    }

    render() {
        var { state, stateCode } = this.props;
        var { active, confirmed, recovered, deceased, deltaconfirmed, deltarecovered, deltadeaths, tested, testperthousand, isLoading } = this.state;
        return(
            <div className="cl-regionCard">
                <p className="cl-regionName">{state} &#8226; {stateCode}</p>
                { tested > 0 ? (<span className="cl-tested">Tested: <span>{tested}</span></span>) : ''}
                
                <Loader isLoading={isLoading}/>
                <Row className="m-0">
                    <Col xs={6} lg={4} className="cl-dataContainer cl-active mt-3">
                        <span>Active</span>
                        <h4 style={dataColor(this.state)}>
                            { numAbb(active) }
                        </h4>
                    </Col>
                    <Col xs={6} lg={4} className="cl-dataContainer cl-confirmed mt-3">
                        <span>Confirmed</span>
                        <h4 style={dataColor(this.state)}>
                            { numAbb(confirmed) }
                            { numAbb(deltaconfirmed) > 0 ?<span className="delta"> &#8593;{this.state.deltaconfirmed}</span> : ''}
                        </h4>
                        
                    </Col>
                    <Col xs={6} lg={4}className="cl-dataContainer cl-testesperkilo mt-3 d-none d-md-block">
                        <span>Tested</span>
                        <h4 style={dataColor(this.state)}>
                            ≈ { testperthousand }
                            <span className="delta"> /1000</span>
                        </h4>
                    </Col>
                    <Col xs={6} lg={4} className="cl-dataContainer cl-recovered mt-3">
                        <span>Recovered</span>
                        <h4 style={dataColor(this.state)}>
                            { numAbb(recovered) }
                            { numAbb(deltarecovered) > 0 ?<span className="delta"> &#8593;{this.state.deltarecovered}</span> : ''}
                        </h4>
                    </Col>
                    <Col xs={6} lg={4} className="cl-dataContainer cl-deceased mt-3">
                        <span>Deceased</span>
                        <h4 style={dataColor(this.state)}>
                            { numAbb(deceased) }
                            { numAbb(deltadeaths) > 0 ?<span className="delta"> &#8593;{numAbb(deltadeaths)}</span> : ''}
                        </h4>
                    </Col>
                    <Col xs={6} lg={4} className="cl-dataContainer cl-testesperkilo mt-3 d-block d-md-none">
                        <span>Tested</span>
                        <h4 style={dataColor(this.state)}>
                            ≈ { testperthousand }
                            <span className="delta"> /1000</span>
                        </h4>
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