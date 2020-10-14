const request = require('request')

const forecast = (latitude, longitude, callback)=> {
   // console.log(latitude, longitude)
    url = 'http://api.weatherstack.com/current?access_key=b0422f4078a5dc250f3d6d195c55a1af&query=' + longitude + ',' + latitude + '&units=f'
    request({url, json: true}, (error, { body})=>{
    
    if(error){
        callback('Unable to connecto to weather service',undefined)
    }
    else if(body.error){
        callback('Error Has Occurred with Query: '+ body.error.info, undefined)
    }
    else{
        
        callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. Feels Like '+ body.current.feelslike+ ' degrees out.')
    
    }
})
}

module.exports = forecast