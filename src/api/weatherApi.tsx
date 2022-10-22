import { getFormattedDate } from '../utils/getFormattedDate';
import getFormattedHours from '../utils/getFormattedHours';

export interface ICoords {
  latitude: number,
  longitude: number
}

export interface IForecastHour {
  time: string,
  temp_c: number,
  condition: {
    text: string,
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
    }
  },
  astro: {},
  hour: IForecastHour[]
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

export interface IHourWeather {
  time: string,
  temp: string,
  text: string,
  icon: string
}

export interface ISingleDayWeather {
  temp: string,
  text: string,
  iconUrl: string,
  date: string,
  hour: IHourWeather[]
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
    weatherForecast: data.forecast.forecastday.map((dayForecast) => {
      return {
        date: getFormattedDate(dayForecast.date),
        temp: `${dayForecast.day.avgtemp_c}°`,
        text: dayForecast.day.condition.text,
        iconUrl: `https:${dayForecast.day.condition.icon}`,
        hour: dayForecast.hour.map((hourForecast) => {
          return {
            time: getFormattedHours(hourForecast.time),
            temp: `${hourForecast.temp_c}°`,
            text: hourForecast.condition.text,
            icon: `https:${hourForecast.condition.icon}`,
          }
        })
      }
    })
  };

  return weatherData;
}
