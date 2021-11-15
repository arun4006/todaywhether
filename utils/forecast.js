const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f362ead747e1896b9eeff52f709f33f5&query=' + latitude + ',' + longitude + '&units=f'

   
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {temp:body.current.temperature,status:body.current.weather_descriptions})
          
        }
    })
}

module.exports = forecast

//http://api.weatherstack.com/current?access_key=f362ead747e1896b9eeff52f709f33f5&query= 80.27,13.09 &units=f
