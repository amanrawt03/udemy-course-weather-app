const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const hbs = require('hbs')
const app = express()
const PORT = process.env.PORT || 3000
const getGeoLocation = require('./utils/getGeoLocation.js')
const getForecast = require('./utils/getForecast.js')
const staticFilesPath = path.join(__dirname,'./public')
const partialsPath = path.join(__dirname,'./public/partials')

app.use(express.static(staticFilesPath))
app.set('view engine', 'hbs')
app.set('views', staticFilesPath)
hbs.registerPartials(partialsPath)
app.get('/', (req, res)=>{
    res.render('index',{
        title:"WEATHER",
        temperature:90
    })
})
app.get('/help', (req, res)=>{
    res.render('help',{
        title:"Help",
        helpText:"For any help contact this email: aman2234@ssjsl.com"
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title:"About"
    })
})
app.get('/weather', (req, res)=>{
    try {
        const {address} = req.query
        if(!address){
            return res.json({error:"No address provided"})
        }
        getGeoLocation(address, (error, data) => {
            if (error) {
                return res.json({error:error})
            } else {
              getForecast(data, (error, data)=>{
                if (error) {
                  return res.json({error:error})
                } else {
                  return res.json({
                    "forecast":data,
                    "address":address
                  })
                }
              })  
            }
          });
        
    } catch (error) {
        console.log(error);
    }
})

app.get('*', (req,res)=>{
    res.render('not-found', {
        error:"Page not found"
    })
})
app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
    
})