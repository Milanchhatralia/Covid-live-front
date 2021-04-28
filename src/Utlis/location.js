const getUserLocation = async (lat, lng, KEY) => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${KEY}`)
        .then(res => res.json())
        .then(address => setAddress(address));
}

const setAddress = address => {
    // console.log(address)
    const {results: [{address_components, formatted_address}]} = address;
    // console.log(address_components)
    // console.log(formatted_address)

    const addressComponents = {};
    const codes = {}
    address_components.forEach( component => {
        component.types.forEach( address_type => {
            addressComponents[address_type] = component.long_name
            // fetch codes
            if(isState(component)) codes[address_type] = component.short_name;
            if(isCountry(component)) codes[address_type] = component.short_name;
        });
    });
    
    const location = {
        city: addressComponents.locality || addressComponents.administrative_area_level_2,
        state: addressComponents.administrative_area_level_1,
        stateCode: codes.administrative_area_level_1,
        country: addressComponents.country,
        countryCode: codes.country,
    }
    // location.city = address_components[0] && address_components[0].long_name
    // location.state = address_components[1] && address_components[1].long_name
    // location.stateCode = address_components[1] && address_components[1].short_name
    // location.country = address_components[2] && address_components[2].long_name
    // location.countryCode = address_components[2] && address_components[2].short_name
    return location;
}

const isState = (component) => {
    return component.types.includes('administrative_area_level_1');
}

const isCountry = (component) => {
    return component.types.includes('country');
}

export {
    getUserLocation,
}