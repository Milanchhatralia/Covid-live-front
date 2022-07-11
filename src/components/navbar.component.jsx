import React, { Component } from 'react';
import SearchIcon from '../images/search-black.svg';
import { ReactComponent as Logo } from '../images/covid-live.svg';
import { fetchRegionDetail } from '../Utlis/getCovidData'
import { debounce } from '../Utlis/optimize';
import { fetchCovidStateData, fetchCovidCountryData } from '../Utlis/getCovidData';

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            focused: false,
            searchResult: [],
        }
        this.handleInputThrottled = debounce(this.updateSearchResult, 300)
    }

    updateSearchResult(searchStr) {
        fetchRegionDetail(searchStr)
            .then(data => {
                this.setState({ searchResult: data })
                console.log(data);
            });
    }

    onFocus = () => {
        this.setState({ focused: true })
    }

    onBlur = () => {
        setTimeout(() => {
            this.setState({ focused: false })
        }, 200)
    }

    regionClick = (e) => {
        const { searchResult } = this.state;
        const { changeCity, changeState, changeCountry } = this.props;
        let index = [...e.target.parentElement.children].indexOf(e.target);
        let item = searchResult[index];
        if (item.type === 'city') {
            changeCity(item);
            if (item.state !== 'undefined') {
                fetchCovidStateData(item.state).then((res) => {
                    changeState(res.data);
                }).catch((err) => {
                    console.log(err);
                });
            }
            if (item.country) {
                fetchCovidCountryData(item.country).then((res) => {
                    changeCountry(res.data);
                }).catch((err) => {
                    console.log(err);
                });
            }
        } else {
            changeState(item);
            if (item.country) {
                fetchCovidCountryData(item.country).then((res) => {
                    changeCountry(res.data);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
        console.log(item);
    }

    resultList = () => {
        let { searchResult } = this.state;
        let listItems = searchResult.map((item) =>
            item.type === 'city'
                ? <li className='cl-regionItem'>
                    {item.city}
                    {item.state !== 'undefined' ? <span className="cl-region-code text-capitalize">{item.state}</span> : ""}
                </li>
                : <li className='cl-regionItem'>
                    {item.state}
                    {item.countrycode !== 'undefined' ? <span className="cl-region-code text-uppercase">{item.countrycode}</span> : ""}
                </li>
        );

        return (
            <ul onClick={this.regionClick}>{listItems.length > 0 ? listItems : <li className='cl-regionItem'>No region found</li>}</ul>
        );
    }

    render() {
        let { focused } = this.state;
        return (
            <React.Fragment>
                <div className="cl-navbar">
                    <div className="cl-logo">
                        <Logo style={logoStyle} />
                        <h4 className="cl-name">Covid Dashboard</h4>
                    </div>
                    <div className="cl-search-icon">
                        <label htmlFor="cl-navSearchbox" className="cl-searchIcon"><img src={SearchIcon} alt="" /></label>
                        <input id="cl-navSearchbox" type="text" placeholder="city, state or country" onKeyUp={e => this.handleInputThrottled(e.target.value)} onFocus={this.onFocus} onBlur={this.onBlur} autocomplete="off" />
                    </div>
                    <div style={searchResultStyle(focused)} className="cl-search-result">
                        <this.resultList />
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

const searchResultStyle = (focused) => {
    let displayProp = focused ? "block" : "none";
    return {
        display: displayProp,
    }
}
const logoStyle = {
    height: '100%',
    width: '30px',
    marginLeft: '6px',
    transition: 'all 0.2s ease-in',
}