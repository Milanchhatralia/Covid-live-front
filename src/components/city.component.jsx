import React , {Component} from 'react';
import axios from 'axios'
import Loader from '../components/elements/loader.component';
import { numAbb } from '../Utlis/numAbb';

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
            isLoading: true,
            dataObjects: ['active','confiremed','recovered','deaths','deltaconfirmed','deltarecovered','deltadeaths'],
        }
    }

    changeCovidDataInState(stateName, availableObj){
        this.setState({ [stateName]: availableObj })
    }

    getCovidCityData = () => {
        const { city } = this.props;
        axios
            .get(`https://covid-live.azurewebsites.net/city/${city}`)
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
        return(
            <div className="cl-regionCard">
                <p className="cl-regionName">{this.props.city}</p>
                <Loader isLoading={this.state.isLoading}/>
                <div className="d-flex flex-wrap">
                    <div className="cl-dataContainer mt-3">
                        <span>Active</span>
                        <h2 style={dataColor(this.state)}>
                            { this.state.active }
                        </h2>
                    </div>
                    <div className="cl-dataContainer mt-3">
                        <span>Confirmed</span>
                        <h2 style={dataColor(this.state)}>
                            { this.state.confirmed }
                            { this.state.deltaconfirmed > 0 ?<span> &#8593;{this.state.deltaconfirmed}</span> : ''}
                        </h2>
                        
                    </div>
                    <div className="cl-dataContainer mt-2">
                        <span>Recovered</span>
                        <h2 style={dataColor(this.state)}>
                            { this.state.recovered }
                            { this.state.deltarecovered > 0 ?<span> &#8593;{this.state.deltarecovered}</span> : ''}
                        </h2>
                    </div>
                    <div className="cl-dataContainer mt-2">
                        <span>Deceased</span>
                        <h2 style={dataColor(this.state)}>
                            { this.state.deceased }
                            { this.state.deltadeaths > 0 ?<span> &#8593;{this.state.deltadeaths}</span> : ''}
                        </h2>
                    </div>
                </div>
                
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