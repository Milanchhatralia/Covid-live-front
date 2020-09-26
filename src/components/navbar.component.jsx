import React, { Component } from 'react';
import SearchIcon from '../images/search-black.svg';
import { ReactComponent as Logo } from '../images/covid-live.svg';
import { fetchRegionDetail } from '../Utlis/getCovidData'
import { debounce } from '../Utlis/optimize';

export default class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {
            focused: false,
            searchResult: [],
        }
        this.handleInputThrottled = debounce(this.updateSearchResult, 300)
    }

    updateSearchResult(searchStr){
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
        this.setState({ focused: false })
    }

    regionClick(){

    }

    resultList = () => {
        let {searchResult} = this.state;
        let listItems = searchResult.map((item) =>
            item.type === 'city' 
            ? <li className='cl-regionItem' data-item={item.type} data-city={item.city} data-state={item.state} onClick={this.regionClick}>
                { item.city }
                { item.state !== 'undefined' ? <span className="cl-region-code text-capitalize">{item.state}</span> :""}
            </li>
            : <li className='cl-regionItem' data-item={item.type} data-state={item.state} onClick={this.regionClick}>
                { item.state }
                { item.countrycode !== 'undefined' ? <span className="cl-region-code text-uppercase">{item.countrycode}</span> :""}
            </li>
        );
    
        return (
            <ul>{listItems.length > 0 ? listItems : <li className='cl-regionItem'>No region found</li>}</ul>
        );
    }

    render(){
        let { focused } = this.state;
        return(
            <React.Fragment>
            <div className="cl-navbar">
                <input id="cl-navSearchbox" type="text" placeholder="city, state or country" onKeyUp={e => this.handleInputThrottled(e.target.value)} onFocus={this.onFocus} onBlur={this.onBlur}/>
                <label htmlFor="cl-navSearchbox" className="cl-searchIcon"><img  src={SearchIcon} alt=""/></label>
                <Logo style={logoStyle}/>
                <div style={searchResultStyle(focused)} className="cl-search-result">
                    <this.resultList/>
                </div>
            </div>
            
            </React.Fragment>
        )
    }
}

const searchResultStyle = (focused) => {
    let displayProp = focused ? "block" : "none";
    return{
        display: displayProp,
    }
}
const logoStyle = {
    height: '100%',
    width: '50px',
    marginLeft: '6px',
    transition: 'all 0.2s ease-in',
}