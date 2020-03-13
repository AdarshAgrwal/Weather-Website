const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
 
const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,  '../templates/views' )
const partialsPath = path.join (__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs') //used to set up handlebars in out application
app.set('views', viewsPath) //to point express to look for templates folder to find hbs files instead of views folder!!
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))//where everything from out css, client side javascrip and images that are being used up in our webpage are stored.


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Adarsh Agarwal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Adarsh Agarwal',
        message:'Hey! How can I help you'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Adarsh Agarwal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error:'You must provide the Location'
        })
    }
        geocode(req.query.address, (error,{longitude,latitude,location} = {})=>{
            if(error){
                return res.send({error})
            }
            forecast(longitude,latitude,(error,data)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast : data,
                    location,
                    address: req.query.address,
            })
        })
    })
}) 

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Adarsh Agarwal',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
     res.render('404',{
        title:'404',
        name:'Adarsh Agarwal',
        errorMessage:'Page not Found'
     })
})

app.listen(port,()=>{
    console.log('Server is up and running at port '+port)
})