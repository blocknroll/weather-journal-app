/*jshint esversion: 8 */

/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=7cfaed94efeac5637df722a154380881';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



// Generate button - event listener
// with callback function to execute when clicked
document.querySelector('#generate').addEventListener('click', addEntry);

function addEntry(e){
  console.log('clicky click click');

  let zip = document.getElementById('zip').value;
  console.log(zip);
  let feelings = document.querySelector('#feelings').value;
  console.log(feelings);
  console.log(baseURL+zip+apiKey);

  // GET WEATHER - async GET request
  const getWeather = async (baseURL, zip, apiKey) => {
    const request = await fetch(baseURL+zip+apiKey);
    try {
      const data = await request.json();
      console.log(data);
      return data;
    } catch(error) {
      console.log('error', error);
    }
  };
}
