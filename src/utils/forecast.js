const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const URL = 'https://api.darksky.net/forecast/a44ffc5608895af11f4ec2f5bda33116/'+ longitude +','+ latitude +'?units=si'
    request({url:URL,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to the Weather services', undefined)
        }else if(response.body.error){
            callback('Unable to find Location',undefined)
        }else{
            const data = response.body.daily.data[0].summary+'The temperature is '+response.body.currently.temperature+' and there is a '+response.body.currently.precipProbability+'% chance of rainfall'
            callback(undefined,data)
        }
    })
}

module.exports=forecast