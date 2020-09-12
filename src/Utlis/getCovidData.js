import axios from 'axios';
import { covid19API, countryURI, search } from '../Utlis/URI';

const fetchCovidCityData = async (city) => {
    return await axios.get(`${covid19API}/city/${city}`).then(res => {
        let covidData = res.data;
        if (covidData.length === 1){
            return {
                data: covidData[0],
            }
        }else if (covidData.length > 1){
            return {
                data: covidData,
            }
        }else if (covidData.length < 1){
            throw Error;
        }
    })
    .catch(err => {
        return { data: false };
    });
}

const fetchCovidStateData = async(state) => {
    return await axios.get(`${covid19API}/state/${state}`).then(res => {
        let covidData = res.data;
        if (covidData.length === 1){
            return {
                data: covidData[0],
            }
        }else if (covidData.length > 1){
            return {
                data: covidData,
            }
        }else if (covidData.length < 1){
            throw Error;
        }
    })
    .catch(err => {
        return { data: false };
    });
}

const fetchCovidCountryData = async(country) => {
    return await axios.get(`${countryURI}/${country}`).then(res => {
        let covidData = res.data;
        if (typeof(covidData) == 'object'){
            return {
                data: covidData
            }
        }else if (covidData.length > 1){
            return {
                data: covidData
            }
        }else if (covidData.length < 1){
            throw Error;
        }
    })
    .catch(err => {
        return { data: false };
    });
}

const fetchRegionDetail = async(region) => {
    if (region.length > 0) {
        return await axios.get(`${search}/${region}`).then(res => {
            // console.log(res.data);
            return res.data;
        })
        .catch(err => {
            return { err };
        });
    }
    return [];
}

export {
    fetchCovidCityData,
    fetchCovidStateData,
    fetchCovidCountryData,
    fetchRegionDetail,
}