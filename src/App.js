import axios from 'axios'
import React from 'react';
import './sass/allstyle.scss';

import CovidLive from './components/covidlive.component'

export default class App extends React.Component {

  constructor(props){
      super(props)
      this.state = {
        isLoading: true,
        city: null,
        state: null,
        stateCode: null,
        country: null,
        countryCode: null,
        brief: null
      }
  }

  

  getCovidData(newState){
    const covidURL = `https://www.trackcorona.live/api`
    
    if(this.state.lat !== null && this.state.long !== 'undefined'){
      const {lat, long} = this.state;

      console.log("Latitude is :", lat);
      console.log("Longitude is :", long);


      let locationURL = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=3a9950e91847442ab69b7c1a9733b192`
      
      axios
        .get(locationURL)
        .then(res => {
            return res.data.results[0]
        })
        .then(data => {
            console.log(data)
            console.log(data.components.state)
            if(typeof data !== 'undefined'){  
              this.setState({
                  city: data.components.city,
                  state: data.components.state,
                  stateCode: data.components.state_code,
                  country: data.components.country,
                  countryCode: data.components.country_code
              })
                
            }
        }).then(() => {
          const enableCORS = `https://cors-anywhere.herokuapp.com/`
          const stateURL = `${covidURL}/provinces/${this.state.state}`
          const countryURL = `${covidURL}/countries/${this.state.countryCode}`
          let cityURL = null;
          if(this.state.city !== null && this.state.city !== 'undefined'){
            cityURL = `${covidURL}/cities/${this.state.city}`
          }

          return Promise.all([
                    fetch(enableCORS+cityURL).then(res => {
                      return res.json()
                    }).catch(err => {
                      // change state for city
                      console.log("problem fetching city")
                      
                    }),
                    fetch(enableCORS+stateURL).then(res => {
                      return res.json()
                    }).catch(err =>{
                      // state for State
                      console.log("problem fetvhing State")
                      
                    }),
                    fetch(enableCORS+countryURL).then(res => {
                      return res.json()
                    }).catch(err => (
                      //  Country State
                      console.log("Problem fetching Country")

                    ))
                  ]).then(([...responses]) => {
                      console.log(responses);
                  }).catch((err) => {
                      console.log(err);
                  });

          // return axios.all([cityURL, stateURL, countryURL]).then(axios.spread((...responses) => {
          //         let cityData = responses[0]
          //         let stateData = responses[1]
          //         let countryData = responses[2]
          //         console.log(cityData)
          //         console.log(stateData);
          //         console.log(countryData);
                  
                  
          //       }))
          //       .catch(err => {

          //       })


        }).then(data => {
          console.log(data)
        })
        .catch(err => {
            if(err){
                return "Please enter your region"
            }
        })
    }
  }

  componentWillMount() {
    const covidURL = `https://www.trackcorona.live/api`
    axios.get(`${covidURL}/travel`)
      .then(res => {
        res.data.data.map((item, key) => {
          if(this.state.country === item.location){
            this.setState({
              brief: item.data,
            })
          }
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ lat: position.coords.latitude, long: position.coords.longitude })     
        this.getCovidData(this.state) 
      },(err)=>{
        // User didn't allowed to access location
        console.log('Please help us to get your location.')
      });
    }
    
    

    
}

  render(){
    return (
      <div className="App">

        <header className="">
          
        </header>
        <CovidLive />
      </div>)
  }
}

