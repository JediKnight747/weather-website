//This Exports the geocode function used to pass in an address and returns a callback lat, long, location

const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicjNzdGFyIiwiYSI6ImNrYnVjZXdmeTA1NXgzMm1qdG9mODc3Z3AifQ.g8PbmXOe78iaWQcGQoaIYA&limit=1'
    request(({url, json:true}),(error,{body}) => {
        if(error){
         //callback to error (body is undefined)   
         callback('Unable to connect to geocode API', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location, try another search', undefined)
        }
        else{
            //callback to body since error is undefined
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode