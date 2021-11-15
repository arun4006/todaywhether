const hbs=require('hbs')
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path=require('path')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast');
const { error } = require('console');
const port=process.env.PORT || 6586;

app.use(express.static('template'))

app.set("view engine", "hbs");
const viewpath=path.join(__dirname,'template/views')
const partialspath=path.join(__dirname,'template/partials')
app.set("views",viewpath);
hbs.registerPartials(partialspath) 

app.get('/', (req, res) => {
    res.render('main',{
        title:'main',
        name:'arunkumar'
    });
}); 

app.get('/help', (req, res) => {
    res.render('help',{
        name:'arunkumar',
        title:'myhelp'
    });
});

app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
     return res.send({
          error:'you must provide an search term'
      })
    }
    res.send({ 
        products:[]
    });
})
app.get('/whether',(req,res)=>{
    if(!req.query.address)
    {
     return res.send({
          error:'you must provide an address term'
      }) 
    }
   geocode(req.query.address,(error,{longitude,latitude,location}={}) => {
       if(error) 
       {
        return res.send({ error })
       }
       forecast(longitude,latitude,(error,forecastdata) => {
          if(error)
          {
            return res.send({error})
          }   
           res.send({
            forecast:forecastdata,
            location:location
          })
    
       })
   })

})

app.get('/home',  (req, res) => {
    res.render('home', {
        post: {
            author: 'Janith Kasun',
            
            image: 'https://img3.exportersindia.com/product_images/bc-full/2018/11/838059/aluminium-home-letter-sculptures-1543400843-4508915.jpeg',
            comments: [
                'This is the first comment',
                'This is the second comment',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
            ]
        },
        title:'myhome',
        name:'arunkumar'
    });
});

app.get('/home/*',(req,res)=>{
    res.render('404',{
        name:'arunkumar',
        title:'404 error',
        errormessage:' home article not Found'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'arunkumar',
        title:'404 page',
        errormessage:'help article not Found'
    })
})

app.listen(6586, () => {
    console.log('The web server has started on the port :'+port);
    console.log(__dirname);
});
