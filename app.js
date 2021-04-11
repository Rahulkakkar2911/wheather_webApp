// This project has various dependencies : look on to the package.json

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine' , 'ejs');
// Performing the get request => when the user make a request on his browser to the home route ,the below callback function responds to the GET request.

app.get("/", function(req,res){
    
   return res.render("index");
    
});

app.get("/result",function(req,res){
   return res.render("index");
});

app.post("/", function(req,res){
   const query = String(req.body.cityName);
   const apiKey =  "1e92c02b348e43b2ba3e98030de0bcca";
   const unit = req.body.unit;
   const apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?"
   const url = apiEndPoint +"appid=" + apiKey +"&q=" + query + "&units=" + unit;
   let afterUnit = "";
    if (unit === "standard") {
       afterUnit = " K"
        }        
    if (unit === "metric") {
            afterUnit ="°C";   
       }
    if (unit === "imperial") {
           afterUnit = " F"
       }

   https.get(url ,function(response){
        
            response.on("data", function(data){
                 
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;

                const weatherDesc = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const icon_url = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
                
               return res.render('result' , {
                    
                    descOfWeather:weatherDesc,
                    unitmeasure:afterUnit,
                    Temperature:temp,
                    imgUrl:icon_url,
                    city:query

                });

                

            });
   
        });

});

app.listen(3000, function(){
    console.log("server is Running on server 3000");
});