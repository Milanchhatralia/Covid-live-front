import React, { Component } from 'react';
import SearchIcon from '../images/search-black.svg';
import { ReactComponent as Logo } from '../images/covid-live.svg';
import { fetchRegionDetail } from '../Utlis/getCovidData'
import { debounce } from '../Utlis/optimize';

export default class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
        this.handleInputThrottled = debounce(this.updateSearchResult, 300)
    }

    updateSearchResult(searchStr){
        fetchRegionDetail(searchStr)
            .then(data => {
                console.log(data);
            });
    }

    render(){
        return(
            <div className="cl-navbar">
                <input id="cl-navSearchbox" type="text" placeholder="city, state or country" onKeyUp={e => this.handleInputThrottled(e.target.value)} />
                <label htmlFor="cl-navSearchbox" className="cl-searchIcon"><img  src={SearchIcon} alt=""/></label>
                <Logo style={logoStyle}/>
            </div>
        )
    }
}
const logoStyle = {
    height: '100%',
    width: '50px',
    marginLeft: '6px',
    transition: 'all 0.2s ease-in',
}