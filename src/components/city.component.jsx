import React , {Component} from 'react';
import axios from 'axios'
import { Col, Row } from 'react-bootstrap';
import Loader from '../components/elements/loader.component';
import { numAbb } from '../Utlis/numAbb';
import { covid19API, localAPI } from '../Utlis/URI';

export default class City extends Component{

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

    changeCovidDataInState(stateName, availableObj){
        this.setState({ [stateName]: availableObj })
    }

    getCovidCityData = () => {
        const { city } = this.props;
        axios
            .get(`${covid19API}/city/${city}`)
            .then(res => {
                let covidData = res.data;
                this.setState({isLoading: false});
                console.log(res);
                console.log(covidData.length);
                if (covidData.length === 1){
                    this.setState({
                        active: covidData[0].active,
                        confirmed: covidData[0].confirmed,
                        deceased: covidData[0].deaths,
                        recovered: covidData[0].recovered,
                        deltaconfirmed: covidData[0].deltaconfirmed,
                        deltadeaths: covidData[0].deltadeaths,
                        deltarecovered: covidData[0].deltarecovered,
                        tested: covidData[0].tested,
                    })
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
        if (prevProps.city !== this.props.city) {
            this.getCovidCityData();
        }
    }

    componentDidMount() {
        this.getCovidCityData();
    }

    render() {
        var { city } = this.props;
        var { active, confirmed, recovered, deceased, deltaconfirmed, deltarecovered, deltadeaths, tested, isLoading } = this.state;
        return(
            <div className="cl-regionCard">
                <p className="cl-regionName">{city}</p>
                <span className="cl-tested">Tested: <span>{tested}</span></span>
                <Loader isLoading={isLoading}/>
                <Row className="m-0">
                    <Col xs={6} className="cl-dataContainer cl-active mt-3">
                        <span>Active</span>
                        <h4 style={dataColor(this.state)}>
                            { numAbb(active) }
                        </h4>
                    </Col>
                    <Col xs={6} className="cl-dataContainer cl-confirmed mt-3">
                        <span>Confirmed</span>
                        <h4 style={dataColor(this.state)}>
                            { numAbb(confirmed) }
                            { numAbb(deltaconfirmed) > 0 ?<span className="delta"> &#8593;{deltaconfirmed}</span> : ''}
                        </h4>
                        
                    </Col>
                    <Col xs={6} className="cl-dataContainer cl-recovered mt-3">
                        <span>Recovered</span>
                        <h4 style={dataColor(this.state)}>
                            { numAbb(recovered) }
                            { numAbb(deltarecovered) > 0 ?<span className="delta"> &#8593;{deltarecovered}</span> : ''}
                        </h4>
                    </Col>
                    <Col xs={6} className="cl-dataContainer cl-deceased mt-3">
                        <span>Deceased</span>
                        <h4 style={dataColor(this.state)}>
                            { numAbb(deceased) }
                            { numAbb(deltadeaths) > 0 ?<span className="delta"> &#8593;{this.state.deltadeaths}</span> : ''}
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