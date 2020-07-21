/*jshint esversion: 8 */

// GENERATE button: add event listener. On click, calls logWeather function
document.querySelector('#generate').addEventListener('click', logWeather);



// CALLBACK function to execute when GENERATE button is clicked
function logWeather() {

  const d = new Date();
  const newDate = d.getMonth() + 1 + '.' + d.getDate()+ '.' + d.getFullYear();
  const zip = document.getElementById('zip').value;
  const feelings = document.querySelector('#feelings').value;

  // pass the zip into /getOpenWeather
  postData( '/getOpenWeather', {zip: zip} )

  .then( function(openWeatherData) {
    // pass the returned 'openWeatherData' into /addData
    // 'openWeatherData' could be named anything
    postData( '/addData',
            {
              temperature:openWeatherData.main.temp,
              date:newDate,
              feelings:feelings
            }
    );
  })

  .then(
  // UPDATE UI with the returned data from the ENDPOINT
  updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      console.log(allData);
      document.querySelector('#date').innerHTML = 'happy ' + allData.date + '!';

      document.querySelector('#temp').innerHTML = "it's " +
                                                  allData.temperature.toFixed()+
                                                  '<span>&#176;</span>F';

      document.querySelector('#content').innerHTML = "and I'm feeling " +
                                                     allData.feelings;
    } catch(error) {
      console.log('updateUI error', error);
    }
  });
}






// async POST Function /////////////////////////////////////////////////////
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), //body datatype must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
    console.log("postData error", error);
    // appropriately handle the error
  }
};
