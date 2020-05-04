/*jshint esversion: 8 */

/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=imperial&APPID=7cfaed94efeac5637df722a154380881';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



// GENERATE button - add event listener
document.querySelector('#generate').addEventListener('click', performAction);

// callback function to execute when clicked
function performAction(e){
  let zip = document.getElementById('zip').value;
  let feelings = document.querySelector('#feelings').value;

  // GET WEATHER - async GET request
  const getWeather = async (baseURL, zip, apiKey) => {
    const response = await fetch(baseURL+zip+apiKey);
    try {
      const data = await response.json();
      return data;
    } catch(error) {
      console.log('getWeather error', error);
    }
  };

  getWeather(baseURL, zip, apiKey,)
  .then(function(data){
    // add data - Call Function
    postData('/addData', {temperature:data.main.temp, date:newDate, feelings:feelings} );
  })
  .then(
  // UPDATE UI with the returned data
  updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      console.log(allData);
      document.querySelector('#date').innerHTML = allData[allData.length-1].date;
      document.querySelector('#temp').innerHTML = allData[allData.length-1].temperature;
      document.querySelector('#content').innerHTML = allData[allData.length-1].feelings;
    } catch(error) {
      console.log('updateUI error', error);
    }
  });
}



// async POST Function //////////////////////////
const postData = async ( url = '', data = {})=>{
  // console.log(data);
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), //body datatype must match "Content-Type" header
  });

  try {
    // console.log(response);
    const newData = await response.json();
    console.log(newData);
    return newData;
  }catch(error) {
    console.log("postData error", error);
    // appropriately handle the error
  }
};
