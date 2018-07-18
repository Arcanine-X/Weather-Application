const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null, typeW: null, city:null, temp: null, description:null});
})

app.post('/', function (req, res) {
    let city = req.body.city;
	let apiKey = '120affb4ca0f8eca4c917de1b45fb11c';
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again',  typeW: null, city:null, temp: null, description:null});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again',  typeW: null, city: null, temp: null, description:null});
      } else {
		let description = weather.weather[0].description;
		let city = weather.name;
		let kelvins = 273.15;
		let temp = weather.main.temp - kelvins;
		let typeW = weather.weather[0].main;
		console.log(typeW);
        let weatherText = `It's ${temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null, typeW, city, temp, description});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Application is listening on port 3000!')
})