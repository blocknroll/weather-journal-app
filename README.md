# Weather Journal App



## Overview

This simple asynchronous web app uses the OpenWeatherMap Web API, along with user input, to dynamically update the UI.



## Goals

The specific goals of this project include:
- Playing with asynchronous JavaScript and chained promises
- Integrating an external Web API
- Practice dynamically updating the UI with DOM manipulation



## API info

- __OpenWeatherMap__
    - <https://openweathermap.org/>
    - input: zip code
    - output: current weather data (JSON)



## Pseudo-code

- user enters a zip code, along with a description of their mood

- user clicks 'Log Your Weather' button

- an Event Listener is listening for that click, and once it hears it, performs a series of steps, asynchronously

- first, the user's inputs are retrieved from the DOM

- next, the user's zip code is sent in an API call to openweathermap.org

- after receiving the returned JSON weather data, a POST request is sent to the server to store the new weather info, along with the user's text input, into the project's data endpoint (a JavaScript object)

- after that's completed, the UI is updated to display the weather data, along with the mood the user entered



## Getting started

### Step 1: Install

- `npm install`


### Step 2: Start the Server

- `npm start`
- view at: __localhost:5000__
