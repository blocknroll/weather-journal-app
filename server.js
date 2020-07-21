/*jshint esversion: 9 */

require('dotenv').config();

// ENDPOINT: Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const port = 5000;

/* Middleware*/
// configure express to use body-parser as middle-ware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const server = app.listen(port, () => {
  // Callback to debug
  console.log(`server running on localhost: ${port}`);
});

const fetch = require('node-fetch');






// ROUTES //////////////////////////////////////////////////////////////////


// GET:  /all  from projectData ENDPOINT  //////////////////////////////////

// takes 2 arguments: URL, callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (req, res){
  res.send(projectData);
}



// POST:  /getOpenWeather  from OPENWEATHER_API  ///////////////////////////

// takes 2 arguments: URL, callback function
app.post('/getOpenWeather', getOpenWeather);

// Callback function to complete POST '/getOpenWeather'
async function getOpenWeather (req, res) {
  const OPENWEATHER_baseURL = 'http://api.openweathermap.org/data/2.5/';
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
  const fullZip = 'weather?zip=' + req.body.zip;
  const relativeURL = fullZip + OPENWEATHER_API_KEY;
  const fullURL = new URL(relativeURL, OPENWEATHER_baseURL);
  const finalURL = fullURL.href;

  const openWeatherResponse = await fetch(finalURL);
  try {
    const openWeatherData = await openWeatherResponse.json();
    // 'res' and 'openWeatherData' could be named anything
    res.send(openWeatherData);
  } catch(error) {
    console.log('getOpenWeather error', error);
  }
}



// POST:  /addData  ////////////////////////////////////////////////////////

// takes 2 arguments: URL, callback function
app.post('/addData', addData);

// Callback function to complete POST '/addData'
function addData (req, res){

  const newData = {
    temperature: req.body.temperature,
    date: req.body.date,
    feelings: req.body.feelings
  };

  // add the newData to the projectData ENDPOINT
  Object.assign(projectData, newData);

  res.send(newData);
  console.log(projectData);
}
