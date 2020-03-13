const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWRhcnNoYWdyd2FsIiwiYSI6ImNrN3BuN2FoNTA4bGEzaXFkcjJvYXQ0ZnAifQ.IaCVUsnZqH77-agcveZKEw&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect with the Location Services',undefined)
        }else if(response.body.features.length===0){
            callback('Location Not found. Try another Location',undefined)
        }else{
            const data={
                longitude:response.body.features[0].center[0],
                latitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name,
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode