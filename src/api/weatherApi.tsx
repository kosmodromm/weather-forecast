import { getFormattedDate } from '../utils/getFormattedDate';

export interface ICoords {
  latitude: number,
  longitude: number
}

export interface IForecastHour {
  time: string,
  temp_c: number,
  condition: {
    icon: string
  }
}

export interface IForecastDay {
  date: string,
  day: {
    maxtemp_c: number,
    mintemp_c: number,
    avgtemp_c: number,
    totalsnow_cm: number,
    condition: {
      icon: string,
      text: string
    },
    astro: {},
    hour: IForecastHour[]
  }
}

export interface IWeatherDTO {
  location: {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    tz_id: string,
    localtime_epoch: number,
    localtime: string
  },
  current: {
    temp_c: number,
    condition: {
      icon: string,
      text: string
    },
    uv: number
  },
  forecast: {
    forecastday: IForecastDay[]
  }
}

export interface ISingleDayWeather {
  temp: string,
  text: string,
  iconUrl: string,
  date: string
}

export interface IWeather {
  city: string,
  tempNow: string,
  iconNow: string,
  text: string,
  weatherForecast: ISingleDayWeather[]
}

//TRIAL on this API Ends on 03/Nov/2022
const API_KEY = "89f5cbfe7d4748bfbdc101556222010";
const DAYS = 10;
const API_URL = new URL('http://api.weatherapi.com/v1/forecast.json?');

export async function getWeatherByCoords(coords: ICoords): Promise<IWeather> {
  let weatherData: IWeatherDTO;

  try {
    const data = await fetch(API_URL + `key=${API_KEY}&q=${coords.latitude},${coords.longitude}&days=${DAYS}&aqi=no&alerts=no`);
    weatherData = await data.json();
    return fromDTO(weatherData);
  } catch (error) {
    throw error;
  }
}

export async function getWeatherByCity(city: string): Promise<IWeather> {
  let weatherData: IWeatherDTO;

  try {
    const data = await fetch(API_URL + `key=${API_KEY}&q=${city.toLowerCase()}&days=${DAYS}&aqi=no&alerts=no`);
    weatherData = await data.json();
    return fromDTO(weatherData);
  } catch (error) {
    throw error;
  }
}

function fromDTO(data: IWeatherDTO): IWeather {
  const weatherData: IWeather = {
    city: data.location.name,
    tempNow: `${data.current.temp_c}°`,
    iconNow: `https:${data.current.condition.icon}`,
    text: data.current.condition.text,
    weatherForecast:
      [
        {
          date: getFormattedDate(data.forecast.forecastday[0].date),
          temp: `${data.forecast.forecastday[0].day.avgtemp_c}°`,
          text: data.forecast.forecastday[0].day.condition.text,
          iconUrl: `https:${data.forecast.forecastday[0].day.condition.icon}`
        },
        {
          date: getFormattedDate(data.forecast.forecastday[1].date),
          temp: `${data.forecast.forecastday[1].day.avgtemp_c}°`,
          text: data.forecast.forecastday[1].day.condition.text,
          iconUrl: `https:${data.forecast.forecastday[1].day.condition.icon}`
        },
        {
          date: getFormattedDate(data.forecast.forecastday[2].date),
          temp: `${data.forecast.forecastday[2].day.avgtemp_c}°`,
          text: data.forecast.forecastday[2].day.condition.text,
          iconUrl: `https:${data.forecast.forecastday[2].day.condition.icon}`
        },
        {
          date: getFormattedDate(data.forecast.forecastday[3].date),
          temp: `${data.forecast.forecastday[3].day.avgtemp_c}°`,
          text: data.forecast.forecastday[3].day.condition.text,
          iconUrl: `https:${data.forecast.forecastday[3].day.condition.icon}`
        }
      ]
  };

  console.log(data, weatherData);
  return weatherData;
}
