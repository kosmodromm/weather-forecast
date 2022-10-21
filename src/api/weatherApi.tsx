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
      icon: string
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
      icon: string
    },
    uv: number
  },
  forecast: {
    forecastday: IForecastDay[]
  }
}

const API_KEY = '89f5cbfe7d4748bfbdc101556222010';
const DAYS = 10;
const API_URL = new URL('http://api.weatherapi.com/v1/forecast.json?');

export async function getWeatherByCoords(coords: ICoords): Promise<IWeatherDTO> {
  let weatherData: IWeatherDTO;

  try {
    const data = await fetch(API_URL + `key=${API_KEY}&q=${coords.latitude},${coords.longitude}&days=${DAYS}&aqi=no&alerts=no`);
    weatherData = await data.json();
    return weatherData;
  } catch (error) {
    throw error;
  }
}

export async function getWeatherByCity(city: string): Promise<IWeatherDTO> {
  let weatherData: IWeatherDTO;

  try {
    const data = await fetch(API_URL + `key=${API_KEY}&q=${city.toLowerCase()}&days=${DAYS}&aqi=no&alerts=no`);
    weatherData = await data.json();
    return weatherData;
  } catch (error) {
    throw error;
  }
}
