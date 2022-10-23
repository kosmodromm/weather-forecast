# Weather Forecast

## Description
- On main page user can enable geolocation and set default city to location (load appropriate forecast)
- Here be able city card with 3-day forecast
  - if user does not want to enable geolocation - default city set to minsk (load appropriate forecast)
  - by click on city card or buttons with other cities' user goes to city page

- City page content two blocks: input for search forecast in typed city, and city card with today-hourly and 10-day forecast

- Value of forecast days can be changed in props of component `CityCard.tsx` (three by default)

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

---
# App workmap

- main page
    - actual weather & 3-day weather in the default city
    - ask user's location on page load -> change default city
    - 3 buttons (for each city: Minsk, Moscow, Bratislava )
    - store chosen city in localstorage
- city page
    - include hourly & 10-day weather forecast
    - get city from url, ex: {...}/in/Milan
    - input with possibility to change city
  
- error handling

