import { getFormattedDate } from '../utils/getFormattedDate';
import getFormattedHours from '../utils/getFormattedHours';
import { ICoords, IWeather, IWeatherDTO } from '../types/types';

//TRIAL on this API Ends on 03/Nov/2022
const API_KEY = "89f5cbfe7d4748bfbdc101556222010";
const DAYS = 10;
const API_URL = new URL('http://api.weatherapi.com/v1/forecast.json?');

export async function getWeatherByCoords(coords: ICoords): Promise<IWeather> {
  let weatherData: IWeatherDTO;
  const params = `key=${API_KEY}&q=${coords.latitude},${coords.longitude}&days=${DAYS}&aqi=no&alerts=no`;

  try {
    const response = await fetch(API_URL + params);
    if (!response.ok) {
      throw await response.json();
    }
    weatherData = await response.json();
    return fromDTO(weatherData);
  } catch (error: any) {
    throw error;
  }
}

export async function getWeatherByCity(city: string): Promise<IWeather> {
  let weatherData: IWeatherDTO;
  const params = `key=${API_KEY}&q=${city.toLowerCase()}&days=${DAYS}&aqi=no&alerts=no`;

  try {
    const response = await fetch(API_URL + params);
    if (!response.ok) {
      throw await response.json();
    }
    weatherData = await response.json();
    return fromDTO(weatherData);
  } catch (error: any) {
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
            icon: `https:${hourForecast.condition.icon}`
          };
        })
      };
    })
  };

  return weatherData;
}
