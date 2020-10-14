//nodejs module path.join

const path = require('path')
const express = require('express')
//This is only needed for partials
const hbs = require('hbs')
const { send } = require('process')
const { request } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
//console.log(__filename)
// using '../' goes up one folder '../..' goes up 2 folders
console.log(path.join(__dirname,'../public'))


const app = express() 

//Define Express Config Paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials' )

//Setup Handlebars Engine and Views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)

//setting up static pages in node js 
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    //using variables in template hbs page, use json
    res.render('index',{
        title:'Weather',
        name: 'me'
})
})

//routes

//root route
//app.com

//help route
//app.com/help

//This is removed becuase the static page is now set up
// app.get('',(req, res)=>{
//     res.send('Hello Express')
// })


//Originally used html, so help used res.send - for hbs using render
// app.get('/help',(req,res)=>{
//     res.send({name:'L',
//                 age:40})
// })



app.get('/help',(req,res)=>{
    //render from hbs: Name of new template (help) then it's objects 
    res.render('help',{title:'Help Page',
                msg:'help is on the way',
                name:'Me'
            })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Ben Franklin',
        name: 'L'
    })
})

app.get('/weather',(req,res)=>{
    if((!req.query.location)){
        return res.send({error:'You must provide a location'})
    }
    geocode(req.query.location,(error, {longitude,latitude, location} = {}  )=>{
        if(error){
           return res.send({error})
        }
        forecast( longitude, latitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.location
            })

        })

    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        //Needs a return because you can not execute a req.query twice
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{title: 'My 404 Help Page',
    name:'Me',
    errorMessage:'Help Page Not found'
})
})

app.get('*',(req,res)=>{
    res.render('404',{title: 'My 404 Page',
            name:'Me',
            errorMessage:'Page Not found'
        })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})